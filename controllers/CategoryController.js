const Category = require("../models/Category");

const CategoryController = {
  
    async create(req, res) {
    try {
      const category = await Category.create(req.body);

      res.status(201).send(category);
    } catch (error) {
      console.error(error);

      res
        .status(500)
        .send({ message: "Ha habido un problema al crear la categoría" });
    }
  },

};

module.exports = CategoryController;
