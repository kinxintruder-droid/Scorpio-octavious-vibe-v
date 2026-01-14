import { auth, db } from "./firebase.js";
import {
  doc, getDoc, setDoc, updateDoc, increment
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function likePost(postId, ownerUid) {
  const user = auth.currentUser;
  if (!user || user.uid === ownerUid) return alert("Cannot like your own post");

  const likeRef = doc(db, "likes", postId, user.uid);
  const already = await getDoc(likeRef);
  if (already.exists()) return;

  await setDoc(likeRef, { at: Date.now() });
  await updateDoc(doc(db, "posts", postId), {
    likes: increment(1)
  });

  // earnings
  await updateDoc(doc(db, "wallets", ownerUid), {
    balance: increment(0.05) // 5 cents per like
  });
}