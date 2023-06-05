const express = require('express');
const EventController = require('../controllers/EventController');
const router = express.Router()


router.post('/createEvent',EventController.createEvent)
router.put('/updateEvent/:_id', EventController.updateEvent)
router.delete('/deleteEvent/:_id', EventController.deleteEvent)
router.get('/getAll',EventController.getAllEvents)


module.exports = router;