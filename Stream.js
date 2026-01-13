import { auth, db } from "./firebase.js";
import { doc, setDoc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let streamId;

window.startStream = async () => {
  const user = auth.currentUser;
  if (!user) return alert("Login first");

  const title = document.getElementById("streamTitle").value.trim();
  if (!title) return alert("Enter a title");

  streamId = `${user.uid}-${Date.now()}`;

  await setDoc(doc(db, "streams", streamId), {
    streamerUid: user.uid,
    title,
    viewers: 0,
    earnings: 0,
    isActive: true,
    createdAt: Date.now()
  });

  document.getElementById("liveContainer").innerHTML = `<video autoplay muted id="liveVideo"></video>`;
  // Implement WebRTC / MediaStream for real live streaming
  alert("Live stream started!");
  
  // Real-time updates
  onSnapshot(doc(db, "streams", streamId), snap => {
    const data = snap.data();
    viewerCount.innerText = data.viewers;
    streamEarnings.innerText = data.earnings.toFixed(2);
  });
};

window.endStream = async () => {
  if (!streamId) return;
  await updateDoc(doc(db, "streams", streamId), { isActive: false });
  alert("Stream ended!");
};