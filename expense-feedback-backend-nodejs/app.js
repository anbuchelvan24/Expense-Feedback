require("dotenv").config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const upload = require("./src/gridStore");

const app = express();
// DB
const mongoURI = process.env.MONGO_URI;

const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let gfs;
conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads"
  });
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.get('/', (req, res) => res.render('index'))

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  // Extract the ObjectId from req.file
  const fileId = req.file.id;
  
  // Return the ObjectId in the response
  app.locals.currId = fileId.toString()
  res.send(fileId);
})

app.get('/id', (req, res) => {
  if (!app.locals.currId) {
    return res.status(404).json({ error: "No ID available" });
  }

  // Log and send the current ID
  res.send(app.locals.currId);
})
app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`)
})
