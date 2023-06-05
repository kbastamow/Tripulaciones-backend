const express = require('express');
const router = express.Router()
const {authentication, isAdmin} = require('../middlewares/authentication')
const CategoryController = require('../controllers/CategoryController');


//isAdmin no está implementado para facilitar desarrollo
router.post('/create',authentication,  CategoryController.createCategory)
router.get('/getAll', CategoryController.getAll)

module.exports = router;

