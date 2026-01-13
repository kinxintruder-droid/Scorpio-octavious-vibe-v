const ban = await getDoc(doc(db, "bans", user.uid));
if (ban.exists()) {
  alert("Account restricted");
  auth.signOut();
}