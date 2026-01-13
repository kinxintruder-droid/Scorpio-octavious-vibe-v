import { auth, db } from "./firebase.js";
import {
  collection, addDoc, query, orderBy,
  onSnapshot, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let convoId = null;

function getConvoId(a, b) {
  return [a, b].sort().join("_");
}

window.send = async function () {
  const text = msg.value;
  const to = receiver.value;
  const user = auth.currentUser;

  convoId = getConvoId(user.uid, to);

  await addDoc(collection(db, "messages", convoId, "chat"), {
    from: user.uid,
    to,
    text,
    createdAt: serverTimestamp()
  });

  msg.value = "";
};

auth.onAuthStateChanged(user => {
  if (!user) return;

  receiver.addEventListener("change", () => {
    convoId = getConvoId(user.uid, receiver.value);

    const q = query(
      collection(db, "messages", convoId, "chat"),
      orderBy("createdAt")
    );

    onSnapshot(q, snap => {
      chat.innerHTML = "";
      snap.forEach(doc => {
        const m = doc.data();
        chat.innerHTML += `<p><b>${m.from}</b>: ${m.text}</p>`;
      });
    });
  });
});