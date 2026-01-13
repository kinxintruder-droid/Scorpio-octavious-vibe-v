function withdraw() {
  fetch("/api/withdraw", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ amount: amount.value })
  })
  .then(r=>r.json())
  .then(d=>alert(d.message));
}