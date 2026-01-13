window.copyInvite = () => {
  const linkInput = document.getElementById("inviteLink");
  linkInput.select();
  linkInput.setSelectionRange(0, 99999); // for mobile
  document.execCommand("copy");
  alert("Invite link copied to clipboard!");
};