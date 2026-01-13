import { auth, db } from "./firebase.js";
import {
  collection, onSnapshot, updateDoc, doc, setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

auth.onAuthStateChanged(user => {
  if (!user || user.email !== "kinxintruder@gmail.com") {
    alert("Admin only");
    location.href = "index.html";
    return;
  }

  onSnapshot(collection(db, "withdrawals"), snap => {
    withdrawals.innerHTML = "";
    snap.forEach(d => {
      const w = d.data();
      withdrawals.innerHTML += `
        <div>
          ${w.uid} — R${w.amount} (${w.method})
          <button onclick="approve('${d.id}')">Approve</button>
        </div>`;
    });
  });
});

window.approve = async function (id) {
  await updateDoc(doc(db, "withdrawals", id), {
    status: "approved"
  });
  alert("Withdrawal approved");
};

window.ban = async function () {
  const uid = banUid.value;
  const type = banType.value;

  await setDoc(doc(db, "bans", uid), {
    type,
    at: Date.now()
  });

  alert("User banned");
};