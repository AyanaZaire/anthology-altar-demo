// PART 1
const express = require('express')
const app = express()
app.use(express.json());

// PART 2
require("dotenv").config();

// Testing URI eviornment variable access
console.log(process.env.MONGO_URI)

// Set up Mongoose
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Test for seccuess database connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});