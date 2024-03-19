/* eslint-disable no-debugger */
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCerWQfGYD-9pEzSNTNEyPvmAEBoFelO7Q",
  authDomain: "chughtai-924e6.firebaseapp.com",
  projectId: "chughtai-924e6",
  storageBucket: "chughtai-924e6.appspot.com",
  messagingSenderId: "1055197917691",
  appId: "1:1055197917691:web:5bac73f15d94155b841b5e",
  measurementId: "G-CQT8PR7H85",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getTokenFunc = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey:
        "BMul4fpexipoS7KKva4rcsy1pgXX2WCOmnS5HMZSMzPdtj14wKUEOIYMyy0qyuVfuCuiPW7z3x4hsbZp4Hc7Boo",
    });

    if (currentToken) {
      console.log("current token for client: ", currentToken);

      return currentToken;
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );

      return null;
    }
  } catch (err) {
    console.log("An error occurred while retrieving token. ", err);
    return null;
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
