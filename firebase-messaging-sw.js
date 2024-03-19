importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);
const firebaseConfig = {
  apiKey: "AIzaSyCerWQfGYD-9pEzSNTNEyPvmAEBoFelO7Q",
  authDomain: "chughtai-924e6.firebaseapp.com",
  projectId: "chughtai-924e6",
  storageBucket: "chughtai-924e6.appspot.com",
  messagingSenderId: "1055197917691",
  appId: "1:1055197917691:web:5bac73f15d94155b841b5e",
  measurementId: "G-CQT8PR7H85",
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = app.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
