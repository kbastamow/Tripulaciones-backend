const express = require("express");
const UserController = require("../controllers/UserController");
const {authentication, isAdmin} = require('../middlewares/authentication');
const router = express.Router();


router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.put("/updateProfile",authentication, UserController.updateProfile)
router.get("/confirm/:email", UserController.confirm);
module.exports = router;

