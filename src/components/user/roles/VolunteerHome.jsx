import { useEffect } from "react";
// import { io } from "socket.io-client";
import CreateHungerSpot from "./volunteer/createHungerSpot/CreateHungerSpot";
import { useSelector } from "react-redux";
import { useDisclosure } from "@chakra-ui/react";
import LocationAlertDialog from "./volunteer/status/LocationAlertDialog";
import VolunteerUpdates from "./volunteer/VolunteerUpdates";
import CurrentWork from "./volunteer/verifyDonation/CurrentWork";
import HungerSpotDetails from "./volunteer/completeDonation/HungerSpotDetails";
import { onMessage } from "firebase/messaging";
import { messaging } from "../../../firebase/firebase";

export default function VolunteerHome() {
  const { user } = useSelector((state) => state.auth);
  // const socket = io(`${import.meta.env.VITE_HOST}`, {
  //   withCredentials: true,
  // });
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (user && !user.currentLocation) {
      onOpen();
    }
  }, [onOpen, user]);

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
              console.log('Notification permission granted.');
          } else {
              console.log('Notification permission denied.');
          }
      });
  }
  
    const unsubscribe = onMessage(messaging, (payload) => {
      if ("serviceWorker" in navigator && "Notification" in window) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification(payload.notification.title, {
            body: payload.notification.body,
            icon: payload.notification.icon,
          });
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  if (user) {
    return (
      <div>
        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-semibold">Welcome, {user.name}</h1>
          <CurrentWork user={user} />
          <div className="hidden md:flex justify-between space-y-2 md:space-y-0">
            <div className="flex flex-col justify-between">
              <CreateHungerSpot />
              <HungerSpotDetails user={user} />
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
