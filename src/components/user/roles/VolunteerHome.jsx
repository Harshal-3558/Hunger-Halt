import { useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

export default function VolunteerHome() {
  const user = useSelector((state) => state.auth.user);
  const socket = io(`${import.meta.env.VITE_HOST}`, {
    withCredentials: true,
  });

  useEffect(() => {
    Notification.requestPermission().then((permission) => {
      console.log("Notification permission", permission);
    });
  }, []);

  useEffect(() => {
    console.log(socket);
    socket.on("foodDonation", (data) => {
      if (user.role === "volunteer") {
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
  }, [socket, user.role]);

  return <div>VolunteerHome</div>;
}
