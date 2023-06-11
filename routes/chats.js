const express = require('express');
const ChatController = require('../controllers/ChatController');
const {authentication, isAdmin} = require('../middlewares/authentication')
const router = express.Router()

router.post("/create", ChatController.create)
router.post("/writeMsg/:chatId", ChatController.writeMsg)
router.post("/findOrCreate", authentication, ChatController.findOrCreate)
router.delete("/deleteMsg/:chatId/:messageId", ChatController.deleteMsg)
router.get("/getChatId/:_id", ChatController.getChatId)
router.get("/getChatsByUserId", ChatController.getChatsByUserId)



module.exports = router;