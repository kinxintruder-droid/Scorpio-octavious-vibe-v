import { storage, db, auth } from "./firebase.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.changeProfilePic = async () => {
  const user = auth.currentUser;
  if (!user) return alert("Login first");

  const file = document.getElementById("profilePicInput").files[0];
  if (!file) return alert("Choose a file");

  const storageRef = ref(storage, `profilePics/${user.uid}`);
  await uploadBytes(storageRef, file);

  const url = await getDownloadURL(storageRef);
  await updateDoc(doc(db, "users", user.uid), { profilePic: url });

  alert("Profile picture updated!");
};