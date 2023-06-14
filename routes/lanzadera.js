const express = require("express")
const LanzaderaController = require("../controllers/LanzaderaController")
const {authentication} = require("../middlewares/authentication")
const router = express.Router()

router.get("/getAll", authentication, LanzaderaController.getAll)
router.get("/getAndLimit", authentication, LanzaderaController.getAndLimit)
router.get("/getById/:_id", authentication, LanzaderaController.getById)


module.exports = router;