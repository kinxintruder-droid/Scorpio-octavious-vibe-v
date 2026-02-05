const today = new Date().toISOString().slice(0,10); // YYYY-MM-DD

await addDoc(collection(db, "withdrawals"), {
  uid: user.uid,
  amount: amt,
  fee,
  method: method.value,
  status: "pending",
  createdAt: Date.now(),
  day: today
});
