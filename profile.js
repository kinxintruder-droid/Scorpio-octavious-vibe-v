import { auth, db } from "./firebase.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.changeNickname = async () => {
  const user = auth.currentUser;
  if (!user) return alert("Login first");

  const newNickname = document.getElementById("nicknameInput").value.trim();
  if (!newNickname) return alert("Enter a nickname");

  await updateDoc(doc(db, "users", user.uid), {
    nickname: newNickname
  });

  alert("Nickname updated!");
};