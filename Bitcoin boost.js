async function payWithBTC() {
  const res = await fetch("/api/btc/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amountZAR: 50,
      userId: USER_ID
    })
  });

  const invoice = await res.json();
  window.location.href = invoice.invoice_url;
}