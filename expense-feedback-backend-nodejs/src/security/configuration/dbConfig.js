


const mongoose = require("mongoose");

function connectDB() {
    mongoose.connect("mongodb://localhost:27017/jwt_db", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
    });

    mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB");
    });

    mongoose.connection.on("error", (error) => {
        console.log("MongoDB connection error", error);
    });
}

module.exports = connectDB;
