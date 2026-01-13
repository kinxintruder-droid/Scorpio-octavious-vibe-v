// Add earnings
await updateDoc(doc(db, "wallets", user.uid), {
  balance: increment(earnAmount)
});