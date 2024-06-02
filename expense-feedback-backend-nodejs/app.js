require("dotenv").config();

const express = require("express");
const signupRoute = require("./src/security/routes/signup");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createAdminAccount } = require("./src/security/scripts/setup");
const loginRoute = require("./src/security/routes/login");
const authRoute = require("./src/security/routes/authenticated");
const { authenticateToken}  = require("./src/security/utils/authMiddleware");
const path = require('path');
const mongoose = require('mongoose');
const upload = require("./src/gridStore");

const app = express();

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
  const fileId = req.file.id;
  const reportname=req.file.metadata.reportname;
  
  app.locals.currId = fileId.toString()
  res.send(fileId);
})

app.get('/id', (req, res) => {
  if (!app.locals.currId) {
    return res.status(404).json({ error: "No ID available" });
  }

  res.send(app.locals.currId);
})
app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`)
})

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
createAdminAccount();

app.use("/user", signupRoute);
app.use("/auth" ,  loginRoute);
app.use("/api" , authRoute);

app.listen(PORT, () => {
    console.log('Server is running on: http://localhost:${PORT}'); 
    console.log(PORT);
});
