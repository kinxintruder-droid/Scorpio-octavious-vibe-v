match /likes/{post}/{uid} {
  allow create: if request.auth.uid == uid;
  allow delete: if false;
}

match /views/{post}/{uid} {
  allow create: if request.auth.uid == uid;
  allow delete: if false;
}