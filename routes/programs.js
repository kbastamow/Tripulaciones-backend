const express = require('express');
const ProgramController = require('../controllers/ProgramController');
const {authentication, isAdmin} = require('../middlewares/authentication')
const router = express.Router()

router.post("/createProgram", authentication, isAdmin, ProgramController.createProgram)
router.get("/getAll", ProgramController.getAll)

//PARA DATA SCIENCE
router.get('/dataGetAll', ProgramController.dataGetAll)

module.exports = router;