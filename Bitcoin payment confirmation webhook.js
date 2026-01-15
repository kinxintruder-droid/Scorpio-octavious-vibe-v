exports.btcWebhook = async (req, res) => {
  const data = req.body;

  if (data.payment_status === "finished") {
    // SAVE PAYMENT
    // ads_payments → PAID
    // platform_wallet → +amount
    // ACTIVATE ADS
  }

  res.sendStatus(200);
};