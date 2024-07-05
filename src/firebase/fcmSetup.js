import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";
import { onMessage } from "firebase/messaging";

export const requestFCMPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BBPUOXhDTxAI5igpkF4BeS-w7APSdskqJ8JmrH0qouXvQiVgBynwmjsh9mYYB4TbygK_ve0WVoq73rLHzfOWwJM",
      });
      console.log(token);
      return token;
    } else {
      console.log("Notification permission denied");
    }
  } catch (error) {
    console.error("An error occurred while retrieving token:", error);
  }
};

export const setupFCMListener = () => {
  onMessage(messaging, (payload) => {
    console.log("Message received:", payload);
    // Handle the message as needed (e.g., show a notification)
  });
};