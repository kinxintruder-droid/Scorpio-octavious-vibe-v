import { auth, db, storage } from "./firebase.js";
import {
  ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import {
  addDoc, collection, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.upload = async function () {
  const file = document.getElementById("file").files[0];
  const user = auth.currentUser;

  const fileRef = ref(storage, `posts/${user.uid}/${Date.now()}`);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);

  await addDoc(collection(db, "posts"), {
    uid: user.uid,
    url,
    createdAt: serverTimestamp()
  });

  alert("Posted");
};