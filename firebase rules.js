rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {

    match /wallets/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }

    match /likes/{post}/{uid} {
      allow write: if request.auth.uid == uid;
    }

    match /views/{post}/{uid} {
      allow write: if request.auth.uid == uid;
    }

    match /withdrawals/{id} {
      allow create: if request.auth != null;
    }
  }
}