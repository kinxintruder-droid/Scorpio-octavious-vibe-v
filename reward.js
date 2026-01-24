import { db } from "./firebase.js";
import { doc, getDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { isValidReferral, canRewardView } from "./fraudProtection.js";

export async function rewardReferral(newUserId, referralCode) {
  if (!await isValidReferral(newUserId, referralCode)) return;

  const refDoc = doc(db, "users", referralCode);
  await updateDoc(refDoc, {
    referralsCount: increment(1),
    points: increment(10)
  });
}

export async function rewardCreator(postId, viewerId) {
  if (!canRewardView(postId, viewerId)) return;

  const postDoc = doc(db, "posts", postId);
  const snap = await getDoc(postDoc);
  if (!snap.exists()) return;

  const creatorId = snap.data().creatorId;
  const creatorDoc = doc(db, "users", creatorId);

  await updateDoc(creatorDoc, {
    points: increment(1),
    wallet: increment(0.01)
  });
}

export async function getUserStats(uid) {
  const userDoc = doc(db, "users", uid);
  const snap = await getDoc(userDoc);
  return snap.exists() ? snap.data() : null;
}
