import { auth, db } from "./firebase.js";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  addDoc,
  collection
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Reel ID should be saved before opening boost screen
// Example: localStorage.setItem("selectedReelId", reelId);
const selectedReelId = localStorage.getItem("selectedReelId");

window.payBoost = async function () {
  const user = auth.currentUser;
  if (!user) return alert("Login required");

  if (!selectedReelId)
    return alert("No reel selected");

  const amount = Number(document.getElementById("boostAmount").value);

  const walletRef = doc(db, "wallets", user.uid);
  const snap = await getDoc(walletRef);

  if (!snap.exists() || snap.data().balance < amount)
    return alert("Insufficient balance");

  // Deduct wallet money
  await updateDoc(walletRef, {
    balance: increment(-amount)
  });

  // Save boost record
  await addDoc(collection(db, "boosts"), {
    uid: user.uid,
    reelId: selectedReelId,
    amount,
    createdAt: Date.now()
  });

  // Increase ranking score
  await updateDoc(doc(db, "reels", selectedReelId), {
    boostScore: increment(amount)
  });

  alert("Boost successful!");
};
