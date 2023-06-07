const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true

        },

        surname: {
            type: String,
            required: true
        },
        
        email: {
            type: String,
            match: [/.+\@.+\..+/, "Este correo no es válido"],
            //match: [/.+@edem\.es$/, 'El correo electrónico debe terminar en @edem.es'], (validacion para solo @edem.es)
            unique: true,
            required: [true, "Introduce el correo para el usuario"],
        },

        password: {
            type: String,
            required: [true, "Introduce la contraseña"]
        },

        age: {
            type: String,

        },

        gender: {
            type: String,
            required: [true, "Por favor rellena el género"],
        },

        role: {
            type: String,
            default: "user"
        },

        roleMde: {
            type: String,
            default: "student"
        },
        
        program: {
            type: ObjectId,
            ref: "Program"
        },
        year: {   //BOOTCAMP & MASTER: "1"
            type: String,
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
    //categoryIds son los intereses!
        categoryIds: [{
            type: ObjectId,
            ref: "Category"
        }],
    //eventIds son eventos donde estás apuntado
        eventIds: [{
            type: ObjectId,
            ref: "Event"
        }],
        confirmed: {
            type: Boolean
        },

        tokens: []

}, {timestamps: true})

UserSchema.index({   //buscador por nombre o correo
    name: "text",
    surname: "text",
  });


UserSchema.methods.toJSON = function() {
    const user = this._doc;
    delete user.tokens;
    delete user.password;
    return user;
}

const User = mongoose.model("User", UserSchema);

module.exports = User;