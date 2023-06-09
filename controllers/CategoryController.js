const Category = require("../models/Category");
const Event = require("../models/Event");

const CategoryController = {
  async createCategory(req, res) {
    try {
      const category = await Category.create(req.body);

      res.status(201).send({ message: "Categoría creada", category });
    } catch (error) {
      console.error(error);

      res
        .status(500)
        .send({ message: "Ha habido un problema al crear la categoría" });
    }
  },

  async getEventsByCategory(req, res) {
    try {
      const { categoryId } = req.params;
      const category = await Category.findById(categoryId).populate("eventIds");
      res.status(200).send({ events: category.eventIds });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al obtener los eventos" });
    }
  },

  async getAll(req, res) {
    try {
      const categories = await Category.find()
      .select("_id name")

      res.send(categories);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Ha habido un problem en mostrar categorías" });
    }
  },

  async update(req, res) {
    try {
      const category = await Category.findByIdAndUpdate(
        req.params._id,
        req.body,
        { new: true }
      );
      res.send({ message: "category successfully updated", category });
    } catch (error) {
      console.error(error);
    }
  },

  async getCategoriesByName(req, res) {
    try {
      const category = await Category.find({
        $text: {
          $search: req.params.name,
        },
      });

      res.send(category);
    } catch (error) {
      console.log(error);
    }
  },

  async delete(req, res) {
    try {
      const category = await Category.findByIdAndDelete(req.params._id);
      res.send({ category, message: "Category deleted" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "there was a problem trying to remove the category" });
    }
  },
};

module.exports = CategoryController;
