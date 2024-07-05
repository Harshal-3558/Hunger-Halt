// public/firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.2/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDCn46hnBPH3KOrRqlJglOQUL3N2sJxrSk",
  authDomain: "hunger-halt-4b87e.firebaseapp.com",
  projectId: "hunger-halt-4b87e",
  storageBucket: "hunger-halt-4b87e.appspot.com",
  messagingSenderId: "653584864180",
  appId: "1:653584864180:web:a899088d41317db7e858e1",
  measurementId: "G-7NKP1JJDE3",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});