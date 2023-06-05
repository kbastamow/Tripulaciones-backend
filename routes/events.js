const express = require('express');
const EventController = require('../controllers/EventController');
const router = express.Router()


router.post('/createEvent',EventController.createEvent)

module.exports = router;