import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
import Loader from "../Loader";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export default function NgoHome() {
  const [hungerSpots, setHungerSpots] = useState([]);
  const [location, setLocation] = useState({});
  const { user } = useSelector((state) => state.auth);
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
      zoom: 12, // starting zoom
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

  if (user) {
    return (
      <div>
        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-semibold">Welcome, {user?.name}</h1>
          <div className="flex space-x-2">
            <div
              id="map"
              style={{ width: "100%", height: "500px", borderRadius: "20px" }}
            ></div>
            <div className="w-5/12 bg-slate-100 rounded-3xl p-4 space-y-3">
              <h1 className="text-xl font-semibold">Active Hunger Spots</h1>
              <div className="space-y-2">
                {hungerSpots.map((item) => (
                  <div key={item.id} className="bg-gray-300 p-2 rounded-lg">
                    <Link to={"/notification"}>
                      <p>Address : {item.address}</p>
                      <p>Required Amount (Aprox) : {item.requiredQTY} kg</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Loader />
    </div>
  );
}
