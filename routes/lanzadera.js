const express = require("express")
const LanzaderaController = require("../controllers/LanzaderaController")
const {authentication} = require("../middlewares/authentication")
const router = express.Router()

router.get("/getAll", LanzaderaController.getAll)
router.get("/getAndLimit", LanzaderaController.getAndLimit)


module.exports = router;