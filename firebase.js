import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDxdGrEG6LHcZogIV_RpkE_PKQfgjzDNG8",
  authDomain: "scorpio-octavious-vibe.firebaseapp.com",
  projectId: "scorpio-octavious-vibe",
  storageBucket: "scorpio-octavious-vibe.firebasestorage.app",
  messagingSenderId: "395329819255",
  appId: "1:395329819255:web:69aa50a8adfe002a85ac72"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);