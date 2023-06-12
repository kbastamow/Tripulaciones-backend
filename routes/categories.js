const express = require('express');
const router = express.Router()
const {authentication, isAdmin} = require('../middlewares/authentication')
const CategoryController = require('../controllers/CategoryController');


//isAdmin no está implementado para facilitar desarrollo
router.post('/create',authentication,CategoryController.createCategory)
router.get('/getAll', CategoryController.getAll)
router.get('/name/:name',CategoryController.getCategoriesByName)
router.put('/update/:_id', authentication,CategoryController.update)//falta isAdmin
router.delete('/delete/:_id', authentication,CategoryController.delete)//falta isAdmin

//PARA DATA SCIENCE
router.get('/dataGetAll', CategoryController.dataGetAll)

module.exports = router;

