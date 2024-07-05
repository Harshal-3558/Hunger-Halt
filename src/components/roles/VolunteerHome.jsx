import { useEffect } from "react";
import CreateHungerSpot from "./volunteer/createHungerSpot/CreateHungerSpot";
import { useSelector } from "react-redux";
import VolunteerUpdates from "./volunteer/VolunteerUpdates";
import CurrentWork from "./volunteer/verifyDonation/CurrentWork";
import HungerSpotDetails from "./volunteer/completeDonation/HungerSpotDetails";
import { onMessage } from "firebase/messaging";
import { messaging } from "../../firebase/firebase";
import Loader from "../Loader";

export default function VolunteerHome() {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        } else {
          console.log("Notification permission denied.");
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
          <h1 className="text-xl md:text-2xl font-semibold">
            Welcome, {user.name}
          </h1>
          <CurrentWork user={user} />
          <div className="md:flex justify-between space-y-2 md:space-y-0">
            <div className="flex md:flex-col justify-between">
              <CreateHungerSpot />
              <HungerSpotDetails user={user} />
            </div>
            <VolunteerUpdates user={user} />
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
