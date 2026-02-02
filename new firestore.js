match /withdrawals/{id} {
  allow create: if request.auth != null;
  allow read: if request.auth != null;
  allow update: if exists(
    /databases/$(database)/documents/admins/$(request.auth.uid)
  );
}
