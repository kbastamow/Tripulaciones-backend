const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre del programa es obligatorio"],
        unique: true
    },

    translation: {
        type: String,

    },

    type: {
        type: String,
    }
}, { timestamps: true})

const Program = mongoose.model("Program", programSchema)

module.exports = Program;