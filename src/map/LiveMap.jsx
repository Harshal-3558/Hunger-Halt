import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import { io } from "socket.io-client";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export default function LiveMap() {
  const [hungerSpots, setHungerSpots] = useState([]);
  const [ngos, setNgos] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [location, setLocation] = useState({});
  //   const socket = io(`${import.meta.env.VITE_HOST}`, {
  //     withCredentials: true,
  //   });

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    // Fetch hunger spots, NGOs, and volunteers from the backend
    const fetchHungerSpots = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST}/donor/livemap`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userLocation: location,
            }),
          }
        );
        const data = await response.json();
        setHungerSpots(data.hungerSpots);
        setNgos(data.ngos);
        setVolunteers(data.volunteers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchHungerSpots();
  }, [location]);

  useEffect(() => {
    // Initialize Mapbox map
    const map = new mapboxgl.Map({
      container: "live-map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [73.100279, 19.0013848], // starting position [lng, lat]
      zoom: 11, // starting zoom
    });

    const hungerSpotOptions = {
      color: "#DC2626", // Custom color
      draggable: false,
    };

    const ngoSpotOptions = {
      color: "#0ea5e9",
      draggable: false,
    };

    const volunteerSpotOptions = {
      color: "#16a34a", // Custom color
      draggable: false,
    };

    // Add markers for each hunger spot
    // Add markers for each hunger spot
    hungerSpots.forEach((spot) => {
      const marker = new mapboxgl.Marker(hungerSpotOptions)
        .setLngLat([spot.location.coordinates[0], spot.location.coordinates[1]])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `
            <div class="popup">
              <p>${spot.address}</p>
              <img src="${spot.image}" alt="Hunger Spot Image" class="w-full rounded-lg mb-2" />
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">View Details</button>
            </div>
          `
          )
        ) // add popups
        .addTo(map);

      // Add event listener to the marker
      marker.getElement().addEventListener("click", () => {
        // You can add custom logic here when the marker is clicked
        console.log("Marker clicked:", spot);
      });
    });

    // Add markers for each NGO
    ngos.forEach((ngo) => {
      new mapboxgl.Marker(ngoSpotOptions)
        .setLngLat([
          ngo.workingLocation.coordinates[0],
          ngo.workingLocation.coordinates[1],
        ])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<h3 className="font-bold">Name: ${ngo.adminName}</h3><p>Email: ${ngo.email}</p>`
          )
        ) // add popups
        .addTo(map);
    });

    // Add markers for each volunteer
    volunteers.forEach((volunteer) => {
      new mapboxgl.Marker(volunteerSpotOptions)
        .setLngLat([
          volunteer.currentLocation.coordinates[0],
          volunteer.currentLocation.coordinates[1],
        ])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<h3 className="font-bold">Name: ${volunteer.name}</h3><p>Email: ${volunteer.email}</p>`
          )
        ) // add popups
        .addTo(map);
    });

    return () => map.remove(); // Clean up on unmount
  }, [hungerSpots, ngos, volunteers]);

  return (
    <div className="bg-slate-200 p-4 rounded-xl md:w-full">
      <h2 className="text-xl font-bold mb-2">Live Map</h2>
      <div id="live-map" className="w-full h-80 rounded-lg"></div>
      <div className="mt-2 flex space-x-4 justify-center">
        <div className="flex space-x-1 items-center">
          <div className="h-5 w-5 bg-red-500 rounded-full"></div>
          <p className="text-sm font-semibold">Hunger Spots</p>
        </div>
        <div className="flex space-x-1 items-center">
          <div className="h-5 w-5 bg-green-500 rounded-full"></div>
          <p className="text-sm font-semibold">Volunteers</p>
        </div>
        <div className="flex space-x-1 items-center">
          <div className="h-5 w-5 bg-blue-500 rounded-full"></div>
          <p className="text-sm font-semibold">NGOs</p>
        </div>
      </div>
    </div>
  );
}
