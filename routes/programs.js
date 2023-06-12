const express = require('express');
const ProgramController = require('../controllers/ProgramController');
const {authentication, isAdmin, dataAuthentication} = require('../middlewares/authentication')
const router = express.Router()

router.post("/createProgram", authentication, isAdmin, ProgramController.createProgram)
router.get("/getAll", authentication, ProgramController.getAll)

//PARA DATA SCIENCE
router.get('/dataGetAll', dataAuthentication, ProgramController.dataGetAll)

module.exports = router;