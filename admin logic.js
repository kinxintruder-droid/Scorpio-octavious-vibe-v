import { db } from "./firebase.js";
import {
  collection, query, orderBy,
  onSnapshot, doc, updateDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const list = document.getElementById("withdrawals");

const q = query(
  collection(db, "withdrawals"),
  orderBy("createdAt", "desc")
);

onSnapshot(q, snap => {
  list.innerHTML = "";
  snap.forEach(d => {
    const w = d.data();
    const li = document.createElement("li");

    li.innerHTML = `
      <b>${w.amount}</b> via ${w.method}
      <br>Status: <b>${w.status}</b>
      <br>
      <button onclick="approve('${d.id}')">Approve</button>
      <button onclick="markPaid('${d.id}')">Mark Paid</button>
      <button onclick="reject('${d.id}')">Reject</button>
      <hr>
    `;

    list.appendChild(li);
  });
});

window.approve = async id => {
  await updateDoc(doc(db, "withdrawals", id), {
    status: "approved",
    approvedAt: serverTimestamp()
  });
};

window.markPaid = async id => {
  const ref = prompt("Enter PayPal / PayFast reference:");
  await updateDoc(doc(db, "withdrawals", id), {
    status: "paid",
    paidAt: serverTimestamp(),
    reference: ref || "manual"
  });
};

window.reject = async id => {
  await updateDoc(doc(db, "withdrawals", id), {
    status: "rejected",
    rejectedAt: serverTimestamp()
  });
};
