const express = require("express");
const mongoose = require("mongoose");
const router = require("./router");
const cors = require('cors')
const dotenv = require("dotenv").config({ path: "./.env" });

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`\n\nServer started on port ${PORT}🚀`);
      console.log(`http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
