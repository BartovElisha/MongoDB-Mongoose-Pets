const mongoose = require('mongoose');

const viterenarSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobileNumber: String
});

module.exports = mongoose.model("viterenar", viterenarSchema);