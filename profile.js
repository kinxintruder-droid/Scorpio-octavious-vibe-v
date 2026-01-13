import { doc, updateDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.followUser = async (otherUid) => {
  const user = auth.currentUser;
  if (!user) return alert("Login first");
  if (user.uid === otherUid) return alert("Cannot follow yourself");

  await updateDoc(doc(db, "following", user.uid), {
    follows: arrayUnion(otherUid)
  });
  await updateDoc(doc(db, "followers", otherUid), {
    followers: arrayUnion(user.uid)
  });

  alert("You are now following this user!");
};

window.sendFriendRequest = async (otherUid) => {
  const user = auth.currentUser;
  if (!user) return alert("Login first");
  if (user.uid === otherUid) return alert("Cannot friend yourself");

  await updateDoc(doc(db, "friendRequests", otherUid), {
    requests: arrayUnion(user.uid)
  });

  alert("Friend request sent!");
};

window.acceptFriendRequest = async (otherUid) => {
  const user = auth.currentUser;
  await updateDoc(doc(db, "friends", user.uid), {
    friends: arrayUnion(otherUid)
  });
  await updateDoc(doc(db, "friends", otherUid), {
    friends: arrayUnion(user.uid)
  });
  await updateDoc(doc(db, "friendRequests", user.uid), {
    requests: arrayRemove(otherUid)
  });

  alert("Friend request accepted!");
};