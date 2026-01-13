require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const withdrawals = require("./server/withdrawals");
app.post("/api/withdraw", withdrawals);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running on", PORT));