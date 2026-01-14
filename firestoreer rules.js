match /wallets/{uid} {
  allow read: if request.auth.uid == uid;
  allow write: if false;
}