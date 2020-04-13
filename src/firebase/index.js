import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAkBeL4h3zNp-_mM6VM5y0pR5Y9eRkSVZI",
  authDomain: "pi-assignment.firebaseapp.com",
  databaseURL: "https://pi-assignment.firebaseio.com",
  projectId: "pi-assignment",
  storageBucket: "pi-assignment.appspot.com",
  messagingSenderId: "835664169107",
  appId: "1:835664169107:web:cae40627d29a99ca63e566",
  measurementId: "G-G5F3X0E6XH"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
