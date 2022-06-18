const mongoose = require('mongoose');

const viterenarSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobileNumber: {
        type: String,
        unique: true
    },
});

module.exports = mongoose.model("viterenar", viterenarSchema);