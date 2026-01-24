import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./firebase.js";

const viewedPosts = new Set();

export async function isValidReferral(newUserId, referralCode) {
  if (!referralCode || referralCode === newUserId) return false;
  const refDoc = doc(db, "users", referralCode);
  const snap = await getDoc(refDoc);
  return snap.exists();
}

export function canRewardView(postId, viewerId) {
  const viewKey = `${viewerId}_${postId}`;
  if (viewedPosts.has(viewKey)) return false;
  viewedPosts.add(viewKey);
  return true;
}
