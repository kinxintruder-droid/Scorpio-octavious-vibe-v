// Check if URL has ?ref=REFERRER_UID
const params = new URLSearchParams(window.location.search);
const referrerUid = params.get("ref");

auth.onAuthStateChanged(async (user) => {
  if (user && referrerUid) {
    await setDoc(doc(db, "referrals", user.uid), {
      referrerUid,
      timestamp: Date.now()
    });
  }
});