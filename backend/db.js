// backend/db.js
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://krunaldarekar29:DfR853G5v0aEMZ0v@cluster0.vu6t1tu.mongodb.net/paytm")

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = {
	User
};