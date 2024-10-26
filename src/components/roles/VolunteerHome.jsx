import { useEffect, useState } from "react";
import CreateHungerSpot from "./volunteer/createHungerSpot/CreateHungerSpot";
import { useSelector } from "react-redux";
import CurrentWork from "./volunteer/verifyDonation/CurrentWork";
import { onMessage } from "firebase/messaging";
import { messaging } from "../../firebase/firebase";
import Loader from "../Loader";
import LiveMap from "../../map/LiveMap";
import DonorStats from "./donor/DonorStats";
import VolunteerUpdates from "./volunteer/VolunteerUpdates";
import HungerSpotDetails from "./volunteer/completeDonation/HungerSpotDetails";

export default function VolunteerHome() {
  const { user } = useSelector((state) => state.auth);
  const [foodID, setFoodID] = useState("");

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
          <CurrentWork user={user} setFoodID={setFoodID}/>
          <HungerSpotDetails user={user} foodID={foodID} />
          <div className="grid md:grid-cols-2 md:grid-flow-col gap-4">
            <div className="flex flex-col justify-between">
              <div className="grid grid-cols-2 gap-4">
                <CreateHungerSpot />
                <VolunteerUpdates user={user} />
              </div>
              <div className="hidden md:flex">
                <DonorStats />
              </div>
            </div>
            <LiveMap />
            <div className="md:hidden">
              <DonorStats />
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
