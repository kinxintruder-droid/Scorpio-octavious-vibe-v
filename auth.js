import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDxdGrEG6LHcZogIV_RpkE_PKQfgjzDNG8",
  authDomain: "scorpio-octavious-vibe.firebaseapp.com",
  projectId: "scorpio-octavious-vibe",
  storageBucket: "scorpio-octavious-vibe.firebasestorage.app",
  messagingSenderId: "395329819255",
  appId: "1:395329819255:web:69aa50a8adfe002a85ac72"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// LOGIN
window.login = function () {
  const email = document.getElementById("emailInput").value.trim();
  const password = document.getElementById("passwordInput").value.trim();

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => alert("Welcome to Scorpio Octavious Vibe 🔥"))
    .catch(err => alert(err.message));
};

// REGISTER
window.register = function () {
  const email = document.getElementById("emailInput").value.trim();
  const password = document.getElementById("passwordInput").value.trim();

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => alert("Account created 🚀"))
    .catch(err => alert(err.message));
};
