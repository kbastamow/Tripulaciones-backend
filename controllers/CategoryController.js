const Category = require("../models/Category");
const Event = require("../models/Event");

const CategoryController = {
  async createCategory(req, res) {
    try {
      const category = await Category.create(req.body);
      res.status(201).send({ message: "Categoría creada correctamente", category });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Ha habido un problema al crear la categoría" });
    }
  },

  async getEventsByCategory(req, res) {
    try {
      const { categoryId } = req.params;
      const category = await Category.findById(categoryId).populate("eventIds");
      res.status(200).send({ events: category.eventIds });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Ha habido un problema al obtener los eventos" });
    }
  }
};

module.exports = CategoryController;
