require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");

const threatRoutes = require("./routes/threatRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", threatRoutes);

pool.connect()
  .then(() => console.log("PostgreSQL Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Threat Intelligence API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});