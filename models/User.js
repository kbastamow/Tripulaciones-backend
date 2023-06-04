const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            match: [/.+\@.+\..+/, "Formato de correo no válido"],
            unique: true,
            required: [true, "Introduce el correo para el usuario"],
        },

        password: {
            type: String,
            required: [true, "Introduce la contraseña"]
        },

        name: {
            type: String,
            required: true

        },
        surname: {
            type: String,
            required: true
        },

        role: {
            type: String,
            default: "user"
        },

        roleMde: {
            type: String
        },
        course: {
            type: String,
        },
        year: {
            type: Number,
        },

        image: {
            type: String,
        },
        bio: {
            type: String,
        },
        connections: [{
            type: ObjectId,
            ref: "User",
            accepted: Boolean
        }],
        confirmed: {
            type: Boolean
        },

        tokens: []

}, {timestamps: true})

const User = mongoose.model("User", UserSchema);

module.exports = User;