module.exports = (req, res) => {
  const amount = Number(req.body.amount);
  res.json({
    message: `Withdrawal R${amount} (R0.80 fee applied)`
  });
};