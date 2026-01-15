import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

window.login = async function () {
  const email = email.value;
  const password = password.value;
  await signInWithEmailAndPassword(auth, email, password);
  window.location = "home.html";
};