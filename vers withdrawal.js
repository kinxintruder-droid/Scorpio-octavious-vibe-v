rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {

    // USER WALLET
    match /wallets/{uid} {
      // User can read only own wallet
      allow read: if request.auth != null
                  && request.auth.uid == uid;

      // Users cannot change balance themselves
      allow write: if false;
    }

    // WITHDRAWAL REQUESTS
    match /withdrawals/{id} {

      // User can create request
      allow create: if request.auth != null
        && request.resource.data.amount > 0
        && request.resource.data.amount <= 10000;

      // User can read own withdrawals
      allow read: if request.auth != null
        && request.auth.uid == resource.data.uid;

      // Admin can update status
      allow update: if exists(
        /databases/$(db)/documents/admins/$(request.auth.uid)
      );
    }

    // ADMIN LIST
    match /admins/{uid} {
      allow read: if request.auth.uid == uid;
    }

  }
}
