rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {

    match /wallets/{uid} {
      allow read: if request.auth.uid == uid;
      allow write: if false;
    }

    match /withdrawals/{id} {

      allow create: if request.auth != null
        && request.resource.data.amount > 0
        && request.resource.data.amount <= 10000;

      allow read: if request.auth != null
        && request.auth.uid == resource.data.uid;

      allow update: if exists(
        /databases/$(db)/documents/admins/$(request.auth.uid)
      );
    }

    match /admins/{uid} {
      allow read: if request.auth.uid == uid;
    }
  }
}
