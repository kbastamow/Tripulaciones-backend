const Event = require("../models/Event");
const Category = require("../models/Category");

const EventController = {
  async createEvent(req, res) {
    try {
      const data = {...req.body}
      delete data.categoryIds;
      const event = await Event.create(data);
      const eventWithCategories = await Event.findByIdAndUpdate(
        event._id,
        { $push: { categoryIds: { $each: req.body.categoryIds } } },
        { new: true }
      );
      console.log(eventWithCategories)
      res.status(201).send({ message: "Evento creado correctamente", eventWithCategories });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Ha habido un problema al crear el evento" });
    }
  },
};

module.exports = EventController;
