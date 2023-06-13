const fs = require("fs"); //manejar imagenes
const path = require("path"); //manejar imagenes
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { getAll } = require("./ProgramController");
const Program = require("../models/Program");
const transporter = require("../config/nodemailer");
const Group = require("../models/Group");
require("dotenv").config();

const GroupController = {
  
  async create(req, res) {
    try {
      const group = await Group.create(req.body);
      const newgroup = await Group.findByIdAndUpdate(group._id, {
        $push: {
          userIds: req.user._id,
          groupAdmins: req.user._id,
        }
      },{new:true})
      res.status(201).send({ message: "Grupo creado con exito", newgroup });
    } catch (error) {
      console.error(error);
    }
  },

  async update(req, res) {
    try {
      const group = await Group.findByIdAndUpdate(
        req.params._id,
        req.body,
        {
          new: true,
        }
      );
      res.send({ message: "Grupo actualizado correctamente", group });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Ha habido un problema al actualizar el grupo' })
    }
  },

  async getAll(req, res){
    try {
        const groups = await Group.find()
        res.status(200).send(groups)
    } catch(error){
        console.error(error)
    }
  },
  
  async getById(req, res) {
    try {
        const group = await Group.findById(req.params._id)
        res.status(200).send(group)
    } catch (error) {
        console.error(error)
        res.status(500).send({msg: "Error en mostrar el grupo"})
    }
  },

  async delete(req, res) {
    try {
      const group = await Group.findByIdAndDelete(req.params._id);
      res.send({ message: "Grupo borrado correctamente", group });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Ha habido un problema al borrar el grupo",
      });
    }
  },

};

module.exports = GroupController;
