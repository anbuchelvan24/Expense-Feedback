const mongoose = require("mongoose"); // Fix: require mongoose directly

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["admin", "employee"], default: "employee" },
});

module.exports = mongoose.model("User", userSchema);
