const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();


router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/updateProfile", UserController.updateProfile)
router.get("/confirm/:email", UserController.confirm);
module.exports = router;

