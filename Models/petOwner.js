const mongoose = require('mongoose');

const petOwnerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        require: true,
        lowercase: true,
        unique: true
    },
    age: {
        type: Number,
        min: 1,
        max: 99
    },
    viterenar_id: mongoose.SchemaTypes.ObjectId,
    pets_id: [mongoose.SchemaTypes.ObjectId]
});

module.exports = mongoose.model("petOwner", petOwnerSchema);