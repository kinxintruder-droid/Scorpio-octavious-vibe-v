rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {

    function isAdmin() {
      return exists(/databases/$(db)/documents/admins/$(request.auth.token.email));
    }

    match /withdrawals/{id} {
      allow read, update: if isAdmin();
      allow create: if request.auth != null;
    }

    match /bans/{uid} {
      allow read, write: if isAdmin();
    }

    match /wallets/{uid} {
      allow read: if request.auth.uid == uid || isAdmin();
    }
  }
}