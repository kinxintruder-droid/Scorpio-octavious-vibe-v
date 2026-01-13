import { auth, db } from "./firebase.js";
import {
  collectionGroup, query, where, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

auth.onAuthStateChanged(user => {
  if (!user) return;

  const q = query(
    collectionGroup(db, "chat"),
    where("to", "==", user.uid)
  );

  onSnapshot(q, snap => {
    notif.textContent = snap.size ? `(${snap.size})` : "";
  });
});