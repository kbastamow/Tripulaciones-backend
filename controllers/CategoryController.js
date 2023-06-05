const Category = require("../models/Category");

const CategoryController = {
  async create(req, res) {
    try {
      const category = await Category.create(req.body);
      
      res
        .status(201)
        .send({ message: "Category created successfully", category });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al crear la categoría" });
    }
  },

  async getAll(req, res) {
    try {
      const categories = await Category.find();

      res.send({ message: "Categories showed successfully", categories });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Has a problem to show categories" });
    }
  }

};

module.exports = CategoryController;
