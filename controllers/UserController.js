const fs = require("fs"); //manejar imagenes
const path = require("path"); //manejar imagenes
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { getAll } = require("./ProgramController");
const Program = require("../models/Program");
const transporter = require("../config/nodemailer");
require("dotenv").config();

const UserController = {
  //Register
  async register(req, res, next) {
    const password = req.body.password;
    let hashedPassword;
    if (password) {
      hashedPassword = bcrypt.hashSync(password, 10); ///encriptando clave de acceso
    }
    try {
      const user = await User.create({
        ...req.body,
        password: hashedPassword,
        confirmed: false,
        role: "user",
      });
      const emailToken = jwt.sign(
        { email: req.body.email },
        process.env.JWT_SECRET,
        { expiresIn: "48h" }
      );
      const url = `http://localhost:${process.env.PORT}/users/confirm/${emailToken}`;
      console.log(user);
      await transporter.sendMail({
        to: req.body.email,
        subject: "Confirme su registro",
        html: `<h3>Bienvenido, estás a un paso de registrarte </h3>
          <a href='${url}'> Click para confirmar tu registro</a>
          `,
      });

      res.status(201).send({ message: "Usuario creado con éxito", user });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  //Confirm

  async login(req, res) {
    console.log(req.body);
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
        user.tokens.shift();
      }
      user.tokens.push(token);
      await user.save();

      res.send({ msg: "Bienvenid@ " + user.name, token, user });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al loguearte", error });
    }
  },

  async confirm(req, res) {
    try {
      await User.updateOne({ email: req.params.email }, { confirmed: true });
      const user = await User.findOne({ email: req.params.email });

      res.status(201).send({ msg: "Usuario confirmado con éxito", user });
    } catch (error) {
      console.error(error);
    }
  },
  //Aquí sin intereses (categorías), hay otro endpoint para ello
  async updateProfile(req, res) {
    try {
      let data = { ...req.body };
     
      console.log(data);
      if (req.file) {
        data = { ...data, image: req.file.filename };
        if (req.user.image) {
          const imagePath = path.join(
            __dirname,
            "../public/images/user/",
            req.user.image
          );
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath); //Node.js method that deletes the corresponding file
          }
        }
      } else {
        delete data.image;
      }

      const user = await User.findByIdAndUpdate(req.user._id, data, {
        new: true,
      });
      res.status(200).send({ msg: "Perfil actualizado", user });
    } catch (error) {
      res.status(500).send("Ha habido un problema actualiando el perfil");
    }
  },

  async addInterests(req, res) {
    try {
      //req.body es un array de ids de categories
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { $push: { categoryIds: { $each: req.body.categoryIds } } }, //$each es como foreach
        { new: true }
      );
      res.status(200).send({ msg: "Intereses actualizados", user });
    } catch (error) {
      console.error(error), res.send("Problema en añadir intereses");
    }
  },

  async getAll(req, res) {
    try {
      const users = await User.find()
        .populate({
          path: "program",
          select: "name translation",
        })
        .populate({
          path: "categoryIds",
          select: "name",
        });
      res.status(200).send(users);
    } catch (error) {
      console.log(error);
    }
  },

  async getById(req, res) {
    try {
      const user = await User.findById(req.params._id)
        .populate({
          path: "program",
          select: "name translation",
        })
        .populate({
          path: "categoryIds",
          select: "name _id",
        })
        .populate({
          path: "eventIds",
          select: "title _id date",
        });
      res.send(user);
    } catch (error) {
      res.send(error);
    }
  },

  async searchByName(req, res) {
    try {
      if (req.params.name.length > 20) {
        return res.status(400).send("Búsqueda demasiado larga");
      }
      const name = new RegExp(req.params.name, "i"); //This from JS
      const users = await User.find({ name });
      if (users.length < 1) return res.status(404).send("No hay resultados");
      res.send(users);
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  },

  //CAMBIAR EL URL CUANDO ESTÈ DESPLEGADO!!!!
  async recoverPassword(req, res) {
    try {
      const recoverToken = jwt.sign(
        { email: req.params.email },
        process.env.JWT_SECRET,
        { expiresIn: "12h" }
      );
      const url = `http://localhost:${process.env.PORT}/users/resetPassword/${recoverToken}`;
      await transporter.sendMail({
        to: req.params.email,
        subject: "Recupera tu contraseña",
        html: `<h3>Recupera la contraseña</h3>
        <a href='${url}'>Sigue el enlace para resetear tu contraseña</a>
        <p>El enlace sigue válido durante 12 horas</p>`,
      });
      res.send({
        message: "Te hemos enviado un correo para recuperar la contraseña",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async resetPassword(req, res) {
    try {
      const recoverToken = req.params.recoverToken;
      const payload = jwt.verify(recoverToken, process.env.JWT_SECRET);
      const password = await bcrypt.hash(req.body.password, 10);
      await User.findOneAndUpdate(
        { email: payload.email },
        { password: password }
      );
      res.send({ msg: "Se ha actualizado tu contraseña" });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });

      res.send({ message: "Desconectado con éxito" });
    } catch (error) {
      console.error(error);

      res.status(500).send({
        message: "Hubo un problema al intentar desconectar al usuario",
      });
    }
  },
};

module.exports = UserController;
