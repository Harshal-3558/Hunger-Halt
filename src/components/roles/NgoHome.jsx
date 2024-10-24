import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useSelector } from "react-redux";
// import { io } from "socket.io-client";
import Loader from "../Loader";
import Status from "./ngo/Status";
import HungerSpots from "./ngo/HungerSpots";
import NgoStats from "./ngo/NgoStats";
// import NgoStore from "./ngo/NgoStore";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export default function NgoHome() {
  const { user } = useSelector((state) => state.auth);
  // const socket = io(`${import.meta.env.VITE_HOST}`, {
  //   withCredentials: true,
  // });

  if (user) {
    return (
      <div>
        <div className="p-6 space-y-6">
          <h1 className="text-xl md:text-2xl font-semibold">
            Welcome, {user.name}
          </h1>
          <Status />
          <div className="md:flex justify-between space-y-2 md:space-y-0">
            <div>
              <HungerSpots />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <NgoStats />
            {/* <NgoStore /> */}
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
