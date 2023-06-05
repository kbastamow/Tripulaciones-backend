const express = require('express');
const router = express.Router()

const CategoryController = require('../controllers/CategoryController');

router.post('/creatCategory',CategoryController.createCategory)
router.get('/getAll', CategoryController.getAll)

module.exports = router;