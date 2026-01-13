import { auth, db } from "./firebase.js";
import {
  doc, getDoc, updateDoc, addDoc, collection, increment
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.withdraw = async function () {
  const user = auth.currentUser;
  const amt = Number(amount.value);
  if (amt <= 0) return;

  const fee = 0.8;
  const total = amt + fee;

  const walletRef = doc(db, "wallets", user.uid);
  const snap = await getDoc(walletRef);
  if (!snap.exists() || snap.data().balance < total)
    return alert("Insufficient balance");

  await updateDoc(walletRef, {
    balance: increment(-total)
  });

  await addDoc(collection(db, "withdrawals"), {
    uid: user.uid,
    amount: amt,
    fee,
    method: method.value,
    status: "pending",
    createdAt: Date.now()
  });

  // Platform fee wallet
  await updateDoc(doc(db, "wallets", "kinxintruder@gmail.com"), {
    balance: increment(fee)
  });

  alert("Withdrawal submitted (5 minutes processing)");
};