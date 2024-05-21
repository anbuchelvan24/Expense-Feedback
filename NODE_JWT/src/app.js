const express = require("express");
const signupRoute = require("./routes/signup");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createAdminAccount } = require("./scripts/setup");
const loginRoute = require("./routes/login");
const authRoute = require("./routes/authenticated");
const { authenticateToken}  = require("./utils/authMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json()); // Middleware to parse JSON bodies
app.use(cors());

createAdminAccount();

app.use("/user", signupRoute);
app.use("/auth" ,  loginRoute);
app.use("/api" , authRoute);

app.listen(PORT, () => {
    console.log('Server is running on: http://localhost:${PORT}'); 
    console.log(PORT);// Corrected the backticks for template literal
});
