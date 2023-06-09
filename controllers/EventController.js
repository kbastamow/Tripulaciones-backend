const Event = require("../models/Event");
const Category = require("../models/Category");

const EventController = {
  async createEvent(req, res) {
    try {
      const event = await Event.create(req.body)
      
      req.body.categoryIds.forEach(async(catId) => await Category.findByIdAndUpdate(
        catId,
        { $push: { eventIds: event._id } },
        {new : true}
      )) 
      res.status(201).send({ message: "Evento creado correctamente", event });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Ha habido un problema al crear el evento" });
    }
  },

  async updateEvent(req, res) {
    try {
      const event = await Event.findByIdAndUpdate(
        req.params._id,
        req.body,
        {
          new: true,
        }
      );
      res.send({ message: "Evento actualizado correctamente", event });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Ha habido un problema al actualizar el evento' })
    }
  },

  async deleteEvent(req, res) {
    try {
      const event = await Event.findByIdAndDelete(req.params._id);
      res.send({ message: "Evento borrado correctamente", event });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Ha habido un problema al borrar el evento",
      });
    }
  },

  async getAllEvents(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const events = await Event.find()
      .populate({path:"categoryIds", select: "name"})
        // .limit(limit)
        // .skip((page - 1) * limit);
       res.status(201).send(events);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Ha habido un problema al intentar los eventos",
      });
    }
  },


};

module.exports = EventController;
