import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-functions.js";

const functions = getFunctions();
const requestWithdrawal = httpsCallable(functions, "requestWithdrawal");

async function withdraw() {
  const amount = document.getElementById("amount").value;
  const method = document.getElementById("method").value;

  try {
    await requestWithdrawal({ amount, method });
    alert("Withdrawal request submitted for admin approval");
  } catch (e) {
    alert(e.message);
  }
}
