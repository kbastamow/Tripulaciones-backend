const express = require("express");
const UserController = require("../controllers/UserController");
const {authentication, isAdmin} = require('../middlewares/authentication');
const router = express.Router();
const { uploadUserImage } = require("../middlewares/upload")

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.put("/updateProfile", authentication, uploadUserImage.single("image"), UserController.updateProfile)
router.put("/addInterests", authentication, UserController.addInterests)
router.get("/confirm/:email", UserController.confirm);
router.get("/getById/:_id", UserController.getById);
router.get("/searchByName/:name", UserController.searchByName)
// router.get('/recoverPassword/:email',UserController.recoverPassword)
router.put("/resetPassword/:recoverToken", UserController.resetPassword)
router.delete('/logout',authentication, UserController.logout)

module.exports = router;

