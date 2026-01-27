import { auth, db } from "./firebase.js";
import {
  collection, doc, getDoc, getDocs,
  updateDoc, increment
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const list = document.getElementById("withdrawals");

onAuthStateChanged(auth, async user => {
  if (!user) return;

  // 🔐 Admin check
  const adminSnap = await getDoc(doc(db, "admins", user.uid));
  if (!adminSnap.exists()) return alert("Not admin");

  loadWithdrawals();
});

async function loadWithdrawals() {
  list.innerHTML = "";
  const snap = await getDocs(collection(db, "withdrawals"));

  snap.forEach(docu => {
    const d = docu.data();
    if (d.status !== "pending") return;

    const li = document.createElement("li");
    li.innerHTML = `
      <b>UID:</b> ${d.uid}<br>
      Amount: R${d.amount}<br>
      Fee: R${d.fee}<br>
      Method: ${d.method}<br>
      <button onclick="approve('${docu.id}')">Approve</button>
      <button onclick="reject('${docu.id}')">Reject</button>
      <hr>
    `;
    list.appendChild(li);
  });
}

window.approve = async function (id) {
  const ref = doc(db, "withdrawals", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;

  const d = snap.data();
  const walletRef = doc(db, "wallets", d.uid);

  // ✅ Update withdrawal
  await updateDoc(ref, { status: "approved" });

  // ✅ Update user wallet
  await updateDoc(walletRef, {
    pendingWithdrawals: increment(-d.total),
    totalWithdrawn: increment(d.amount)
  });

  alert("Withdrawal approved");
  loadWithdrawals();
};

window.reject = async function (id) {
  const ref = doc(db, "withdrawals", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;

  const d = snap.data();
  const walletRef = doc(db, "wallets", d.uid);

  // ❌ Refund user
  await updateDoc(walletRef, {
    balance: increment(d.total),
    pendingWithdrawals: increment(-d.total)
  });

  await updateDoc(ref, { status: "rejected" });

  alert("Withdrawal rejected");
  loadWithdrawals();
};
