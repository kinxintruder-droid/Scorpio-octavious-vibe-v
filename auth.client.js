if (!user.emailVerified) {
  alert("Verify your email to continue");
  auth.signOut();
}