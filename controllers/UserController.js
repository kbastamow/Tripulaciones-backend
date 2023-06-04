const mongoose = require("mongoose");
const bcrypt = require("bcrypt.js");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require ("dotenv").config();


const userController = {
    //Register 
    //Confirm

    async login(req, res) {
        try {
            const user = await User.findOne({email:req.body.email});
            if (!user) {
                return res.status(401).send({msg:"Usuario o contraseña incorrecto"})
            }
            if(!user.confirmed) {
                return res.status(401).send({msg: "Confirma el usuario a través del correo"});

            }
            const isMatch = await bcrypt.compare(req.body.password, user.password)
            if (!isMatch) {
                return res.status(401).send({msg: "Usuario o contraseña incorrecto"})
            }
            const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET);

            if (user.tokens.length >= 2) {
                user.tokens = user.tokens.shift();
                user.tokens.push(token);
                await user.save();
                res.send({token, msg: "Bienvenid@" + user.name });
            }


        } catch (error) {
            console.error(error)
            res.status(500).send(error)   
        }
    },



}


module.exports = UserController;
