import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc, getDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { isValidReferral, canRewardView } from "./fraudProtection.js";

window.register = async function() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const ref = new URLSearchParams(window.location.search).get('ref');

  const cred = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, "users", cred.user.uid), {
    email: email,
    points: 0,
    wallet: 0,
    referralsCount: 0,
    referredBy: ref || null,
    createdAt: Date.now()
  });

  alert("Account created 🚀");
};

window.login = async function() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  await signInWithEmailAndPassword(auth, email, password);
  window.location.href = "dashboard.html";
};
