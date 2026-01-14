import { auth, db } from "./firebase.js";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

auth.onAuthStateChanged(async (user) => {
  if (!user) return location.href = "index.html";

  const uid = user.uid;

  // WALLET
  const walletSnap = await getDoc(doc(db, "wallets", uid));
  if (walletSnap.exists()) {
    document.querySelector("#earnings").innerText =
      "$" + walletSnap.data().totalEarned.toFixed(2);
  }

  // POSTS
  const q = query(collection(db, "posts"), where("ownerUid", "==", uid));
  const snap = await getDocs(q);

  let totalViews = 0;
  let totalLikes = 0;

  snap.forEach(doc => {
    totalViews += doc.data().views || 0;
    totalLikes += doc.data().likes || 0;
  });

  document.querySelector("#views").innerText = formatNumber(totalViews);
  document.querySelector("#engagement").innerText = formatNumber(totalLikes);

  // FOLLOWERS
  const userSnap = await getDoc(doc(db, "users", uid));
  document.querySelector("#followers").innerText =
    formatNumber(userSnap.data().followers || 0);
});

// FORMAT
function formatNumber(n) {
  return n >= 1e6 ? (n/1e6).toFixed(1) + "M" :
         n >= 1e3 ? (n/1e3).toFixed(1) + "K" : n;
}