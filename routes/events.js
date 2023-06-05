const express = require('express');
const EventController = require('../controllers/EventController');
const {authentication, isAdmin} = require('../middlewares/authentication')
const router = express.Router()
const { uploadEventImage } = require("../middlewares/upload")

router.post('/createEvent',authentication, EventController.createEvent)
module.exports = router;