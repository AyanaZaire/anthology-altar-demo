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

// PART 3
// Load CSS and JS File
app.use(express.static('public'))

// Serve HTML File 
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/views/index.html')
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Your app is listening on port: ${port}`)
})

const PoemSchema = new mongoose.Schema({
    title: {type: String},
    author: {type: String},
    poem: {type: String},
    source: {type: String},
    book: {type: String},
    publisher: {type: String},
    year: {type: Number},
    images: {type: [String]}
  });

const Poem = mongoose.model("Poem", PoemSchema)

app.get('/poems', async (request, response) => {
    const poems = await Poem.find({})
    try {
      response.send(poems);
    } catch (error) {
      response.status(500).send(error);
    }
});

app.post("/poems", async (request, response) => {
    const poem = new Poem(request.body);
    try {
      await poem.save();
      response.send(poem);
    } catch (error) {
      response.status(500).send(error);
    }
});