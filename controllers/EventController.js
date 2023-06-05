const Event = require("../models/Event");
const Category = require("../models/Category");

const EventController = {
  async createEvent(req, res) {
    try {

      const event = await Event.create( req.body );
      await Category.findByIdAndUpdate(
        req.body._id,
        { $push: { eventIds: event._id } }); // el push no añade el evento al array eventIds que esta en Category 
      res.status(201).send({ message: "Evento creado correctamente", event });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Ha habido un problema al crear el evento" });
    }
  },

};

module.exports = EventController;
