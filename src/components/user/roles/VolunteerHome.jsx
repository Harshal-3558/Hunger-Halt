import { useEffect } from "react";
import { io } from "socket.io-client";
import CreateHungerSpot from "./volunteer/CreateHungerSpot";
import { useSelector } from "react-redux";
import { useDisclosure } from "@chakra-ui/react";
import LocationAlertDialog from "./volunteer/LocationAlertDialog";

export default function VolunteerHome() {
  const { user, status } = useSelector((state) => state.auth);
  const socket = io(`${import.meta.env.VITE_HOST}`, {
    withCredentials: true,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Check if the user's location is undefined or not set
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
      if (user?.role === "volunteer") {
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
  }, [socket, user?.role]);

  // Render a loading state if the status is "loading"
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Render the component only if the user object is available
  if (user) {
    return (
      <div>
        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-semibold">Welcome, {user.name}</h1>
          <div className="md:flex justify-between items-center space-y-2 md:space-y-0">
            <CreateHungerSpot />
            <div className="h-32 md:h-44 w-full md:w-[600px] bg-slate-200 border rounded-xl"></div>
            <LocationAlertDialog isOpen={isOpen} onClose={onClose} />
          </div>
        </div>
      </div>
    );
  }

  // Render a fallback UI if the user object is not available
  return <div>Error loading user data.</div>;
}
