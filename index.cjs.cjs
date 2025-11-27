const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

// Import the PUBLIC API correctly:
const { Client, Environment } = require("square");

const app = express();
app.use(cors());
app.use(express.json());

console.log("Loaded Square SDK Environment:", Environment); // debug

const client = new Client({
  environment: Environment.Production,   // <-- NOW VALID
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

app.get("/items", async (req, res) => {
  try {
    const result = await client.catalogApi.listCatalog();
    res.json(result);
  } catch (err) {
    console.error("Catalog error:", err);
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 10000;
app.listen(port, () => console.log("Server running on port", port));
