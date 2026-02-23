import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Enter email and password");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);

    // 🔥 THIS CONNECTS TO HOME PAGE
    window.location.href = "home.html";

  } catch (error) {
    alert(error.message);
  }

});
