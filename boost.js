import { auth, db } from "./firebase.js";
import {
  addDoc, collection
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.boost = async function (postId) {
  const user = auth.currentUser;
  if (!user) return;

  await addDoc(collection(db, "boosts"), {
    postId,
    uid: user.uid,
    viewsBought: 1000,
    viewsUsed: 0,
    active: true,
    createdAt: Date.now()
  });

  // Redirect to PayFast / PayPal
  window.location.href = "payfast.html";
};