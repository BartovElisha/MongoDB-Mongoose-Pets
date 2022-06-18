const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    petName: {
        type: String,
        require: true,
        unique: true
    },
    age: {
        type: Number,
        min: 1,
        max: 99
    },
    prefferedFood: {
        type: String
    }
});

module.exports = mongoose.model("pet", petSchema);