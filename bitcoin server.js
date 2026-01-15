const axios = require("axios");

const NOWPAYMENTS_KEY = "YOUR_API_KEY";

exports.createBTCInvoice = async (req, res) => {
  const { amountZAR, userId } = req.body;

  const response = await axios.post(
    "https://api.nowpayments.io/v1/invoice",
    {
      price_amount: amountZAR,
      price_currency: "zar",
      pay_currency: "btc",
      order_id: `ad_${userId}_${Date.now()}`,
      order_description: "Scorpio Octavious Vibe Ads"
    },
    {
      headers: {
        "x-api-key": NOWPAYMENTS_KEY
      }
    }
  );

  res.json(response.data);
};