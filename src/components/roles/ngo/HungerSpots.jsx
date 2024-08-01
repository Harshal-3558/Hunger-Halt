import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { io } from "socket.io-client";
import { Button } from "@chakra-ui/react";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export default function HungerSpots() {
  const [hungerSpots, setHungerSpots] = useState([]);
  const [location, setLocation] = useState({});
  const socket = io(`${import.meta.env.VITE_HOST}`, {
    withCredentials: true,
  });

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
    // Fetch hunger spots from the backend
    const fetchHungerSpots = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST}/location/hungerSpot`,
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
        console.log(data);
        setHungerSpots(data);
      } catch (error) {
        console.error("Error fetching hunger spots:", error);
      }
    };

    fetchHungerSpots();
  }, [location]);

  useEffect(() => {
    // Initialize Mapbox map
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [73.100279, 19.0013848], // starting position [lng, lat]
      zoom: 11, // starting zoom
    });

    // Add markers for each hunger spot
    hungerSpots.forEach((spot) => {
      new mapboxgl.Marker()
        .setLngLat([spot.location.coordinates[0], spot.location.coordinates[1]])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<h3 className="font-bold">${spot.name}</h3><p>${spot.address}</p>`
          )
        ) // add popups
        .addTo(map);
    });

    return () => map.remove(); // Clean up on unmount
  }, [hungerSpots]);

  useEffect(() => {
    Notification.requestPermission().then((permission) => {
      console.log("Notification permission", permission);
    });
  }, []);

  useEffect(() => {
    console.log(socket);
    socket.on("newHungerSpot", (data) => {
      if (Notification.permission === "granted") {
        new Notification("New Hunger Spot", {
          body: `${data.message} by ${data.name}`,
          // icon: "/path/to/icon.png", // Optional: icon path
        });
      }
    });

    return () => {
      socket.off("newHungerSpot");
    };
  }, [socket]);
  return (
    <div>
      <div className="h-[345px] md:h-[460px] w-full md:w-[600px] bg-slate-100 border shadow-md rounded-xl p-4 space-y-2 md:space-y-4">
        <h1 className="text-xl font-semibold">Active Hunger Spots</h1>
        <div id="map" className="w-full h-80 rounded-lg"></div>
        <Button colorScheme="blue">View full list</Button>
      </div>
    </div>
  );
}
