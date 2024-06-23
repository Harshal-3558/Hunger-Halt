import { useEffect } from "react";
import { io } from "socket.io-client";
import CreateHungerSpot from "./volunteer/CreateHungerSpot";
import { useSelector } from "react-redux";
import { useDisclosure } from "@chakra-ui/react";
import LocationAlertDialog from "./volunteer/LocationAlertDialog";
import DonorBadge from "./donor/DonorBadge";
import VolunteerUpdates from "./volunteer/VolunteerUpdates";
import CurrentWork from "./volunteer/CurrentWork";

export default function VolunteerHome() {
  const { user } = useSelector((state) => state.auth);
  const socket = io(`${import.meta.env.VITE_HOST}`, {
    withCredentials: true,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (user && !user.currentLocation) {
      onOpen();
    }
  }, [onOpen, user]);

  useEffect(() => {
    Notification.requestPermission().then((permission) => {
      console.log("Notification permission", permission);
    });
  }, []);

  useEffect(() => {
    socket.on("foodDonation", (data) => {
      if (user?.role === "volunteer" && user?.email === data.userEmail) {
        if (Notification.permission === "granted") {
          new Notification("New Food Donation", {
            body: `${data.foodName} donated by ${data.donorName}`,
            icon: "/path/to/icon.png", // Optional: icon path
          });
        }
      }
    });
    return () => {
      socket.off("foodDonation");
    };
  }, [socket, user]);

  if (user) {
    return (
      <div>
        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-semibold">Welcome, {user.name}</h1>
          <CurrentWork user={user}/>
          <div className="md:flex justify-between space-y-2 md:space-y-0">
            <div className="flex flex-col justify-between">
              <CreateHungerSpot />
              <DonorBadge />
            </div>
            <VolunteerUpdates user={user} />
            <LocationAlertDialog isOpen={isOpen} onClose={onClose} />
          </div>
        </div>
      </div>
    );
  }

  return <div>Error loading user data.</div>;
}
