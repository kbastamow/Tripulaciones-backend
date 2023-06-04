const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const UserController = {
  //Register
  async register(req, res) {
    req.body.role = "user";
    const password = req.body.password;
    let hashedPassword;
    if (password) {
      hashedPassword = bcrypt.hashSync(password, 10); ///encriptando clave de acceso
    }
    try {
      const user = await User.create({
        ...req.body,
        //imagen: req.file.filename,
        password: hashedPassword,
      });
      res.status(201).send({ message: "Usuario creado con éxito", user });
    } catch (error) {
      console.error(error);
    }
  },

  //Confirm

  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).send({ msg: "Usuario o contraseña incorrecto" });
      }
      if (!user.confirmed) {
        return res
          .status(401)
          .send({ msg: "Confirma el usuario a través del correo" });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(401).send({ msg: "Usuario o contraseña incorrecto" });
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

      if (user.tokens.length >= 2) {
        user.tokens = user.tokens.shift();
        user.tokens.push(token);
        await user.save();
        res.send({ token, msg: "Bienvenid@" + user.name });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al loguearte", error });
    }
  },
};

module.exports = UserController;
