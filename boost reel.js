import { auth, db } from "./firebase.js";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  addDoc,
  collection
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Reel ID should be stored when clicking Boost
const selectedReelId = localStorage.getItem("selectedReelId");

window.payBoost = async function () {
  const user = auth.currentUser;
  if (!user) return alert("Login required");

  if (!selectedReelId)
    return alert("No reel selected for boosting");

  const amount = Number(document.getElementById("boostAmount").value);
  const days = Number(document.getElementById("boostDuration").value);

  const expireAt =
    Date.now() + days * 24 * 60 * 60 * 1000;

  const walletRef = doc(db, "wallets", user.uid);
  const snap = await getDoc(walletRef);

  if (!snap.exists() || snap.data().balance < amount)
    return alert("Insufficient wallet balance");

  // Deduct wallet balance
  await updateDoc(walletRef, {
    balance: increment(-amount)
  });

  // Save boost record
  await addDoc(collection(db, "boosts"), {
    uid: user.uid,
    reelId: selectedReelId,
    amount,
    expireAt,
    createdAt: Date.now()
  });

  // Increase reel boost score
  await updateDoc(doc(db, "reels", selectedReelId), {
    boostScore: increment(amount)
  });

  alert("Reel boosted successfully!");
};
