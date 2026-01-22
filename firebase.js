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
  const email = emailInput.value;
  const password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Welcome to Scorpio Octavious Vibe 🔥");
      // window.location.href = "dashboard.html";
    })
    .catch(err => alert(err.message));
};

// SIGN UP
window.register = function () {
  const email = emailInput.value;
  const password = passwordInput.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => alert("Account created successfully 🚀"))
    .catch(err => alert(err.message));
};