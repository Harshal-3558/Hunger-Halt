import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { io } from "socket.io-client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ModalFooter,
  Button,
  Image,
  Badge,
} from "@chakra-ui/react";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export default function HungerSpots() {
  const [hungerSpots, setHungerSpots] = useState([]);
  const [location, setLocation] = useState({});
  const socket = io(`${import.meta.env.VITE_HOST}`, {
    withCredentials: true,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedSpot, setSelectedSpot] = useState({});

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

  const fetchHungerSpots = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST}/ngo/hungerSpot`,
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
      setHungerSpots(data);
    } catch (error) {
      console.error("Error fetching hunger spots:", error);
    }
  };

  useEffect(() => {
    // Fetch hunger spots from the backend
    fetchHungerSpots();
  }, []);

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
      const markerColor = spot.isActive ? "green" : "red";
      new mapboxgl.Marker({ color: markerColor })
        .setLngLat([spot.location.coordinates[0], spot.location.coordinates[1]])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            ` <div class="popup">
              <p>${spot.address}</p>
              <img src="${spot.image}" alt="Hunger Spot Image" class="w-full rounded-lg mb-2" />
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">View Details</button>
            </div>`
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
    socket.on("HPDBChange", () => {
      fetchHungerSpots();
    });
    return () => {
      socket.off("HPDBChange");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenModal = (spot) => {
    setSelectedSpot(spot);
    onOpen();
  };

  useEffect(() => {
    socket.on("HPDBChange", () => {
      fetchHungerSpots();
    });
    return () => {
      socket.off("HPDBChange");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="h-[400px] md:h-full w-full md:w-full bg-slate-100 border shadow-md rounded-xl p-4 space-y-2 md:space-y-4">
        <h1 className="text-xl font-semibold">Active Hunger Spots</h1>
        <div className="flex space-x-4">
          <div>
            <div id="map" className="w-[680px] h-96 rounded-lg border-2"></div>
            <div className="mt-2 flex space-x-4 justify-center">
              <div className="flex space-x-1 items-center">
                <div className="h-5 w-5 bg-green-500 rounded-full"></div>
                <p className="text-sm font-semibold">Active Hunger Spot</p>
              </div>
              <div className="flex space-x-1 items-center">
                <div className="h-5 w-5 bg-red-500 rounded-full"></div>
                <p className="text-sm font-semibold">Inactive Hunger Spot</p>
              </div>
            </div>
          </div>
          <div
            className="h-96 w-[500px] bg-slate-200 rounded-lg p-3 overflow-y-scroll"
            style={{
              WebkitOverflowScrolling: "touch",
              MsOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {hungerSpots.map((spot, index) => (
              <div
                key={index}
                className="py-2 px-5 bg-white rounded-lg cursor-pointer mb-3"
                onClick={() => handleOpenModal(spot)}
              >
                <div className="text-base md:text-sm truncate">
                  <span className="font-semibold">Address</span> :{" "}
                  {spot.address}
                </div>
                <div className="flex space-x-3">
                  <div className="font-semibold text-base md:text-sm">
                    No. of Beneficiaries :
                  </div>
                  <div className="font-semibold text-base md:text-sm">
                    {spot.totalBeneficiary}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hunger Spot</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="space-y-2">
              <div className="text-base md:text-base">
                <span className="font-semibold">Address</span> :{" "}
                {selectedSpot.address}
              </div>
              <div className="flex space-x-3 text-base md:text-base">
                <div className="font-semibold">No. of Beneficiaries :</div>
                <div className="font-semibold">
                  {selectedSpot.totalBeneficiary}
                </div>
              </div>
              <div className="flex space-x-3 text-base md:text-base">
                <div className="font-semibold">Created by :</div>
                <div>{selectedSpot.name}</div>
              </div>
              <div className="flex space-x-3 text-base md:text-base">
                <div className="font-semibold">Status :</div>
                <div>
                  {selectedSpot.isActive === true && (
                    <Badge colorScheme="green">Active</Badge>
                  )}
                </div>
                <div>
                  {selectedSpot.isActive === false && (
                    <Badge colorScheme="yellow">Disabled</Badge>
                  )}
                </div>
              </div>
              <div className="text-base md:text-base">
                <div className="font-semibold">Location Image :</div>
                <Image
                  src={selectedSpot.image}
                  rounded={"lg"}
                  alt="Location"
                  width={300}
                  height={200}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
