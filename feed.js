import {
  collection,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { db } from "./firebase.js";

const feed = document.getElementById("feed");

const q = query(
  collection(db, "reels"),
  orderBy("boostScore", "desc")
);

onSnapshot(q, snap => {
  feed.innerHTML = "";

  snap.forEach(docu => {
    const reel = docu.data();

    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${reel.title || "Untitled Reel"}</h3>
      <video src="${reel.videoUrl}" controls width="300"></video>
      <p>Boost Score: ${reel.boostScore || 0}</p>
    `;

    feed.appendChild(div);
  });
});
