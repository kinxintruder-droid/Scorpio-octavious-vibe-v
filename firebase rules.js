rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /messages/{convo}/{chat}/{msg} {
      allow read, write: if request.auth != null;
    }

  }
}