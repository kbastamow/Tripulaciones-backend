const express = require('express');
const router = express.Router()
const {authentication, isAdmin, dataAuthentication} = require('../middlewares/authentication')
const CategoryController = require('../controllers/CategoryController');


router.post('/create',authentication,CategoryController.createCategory)
router.get('/getAll', authentication, CategoryController.getAll)
router.get('/name/:name', authentication, CategoryController.getCategoriesByName)
router.put('/update/:_id', authentication,CategoryController.update)//falta isAdmin
router.delete('/delete/:_id', authentication,CategoryController.delete)//falta isAdmin

//PARA DATA SCIENCE
router.get('/dataGetAll', dataAuthentication, CategoryController.dataGetAll)

module.exports = router;

