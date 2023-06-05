const express = require('express');
const router = express.Router()
const {authentication, isAdmin} = require('../middlewares/authentication')
const CategoryController = require('../controllers/CategoryController');

router.post('/create',authentication,isAdmin,CategoryController.create)
router.get('/getAll', CategoryController.getAll)

module.exports = router;