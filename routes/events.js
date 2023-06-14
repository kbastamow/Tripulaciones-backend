const express = require('express');
const EventController = require('../controllers/EventController');
const {authentication, isAdmin, dataAuthentication} = require('../middlewares/authentication')
const router = express.Router()
const { uploadEventImage } = require("../middlewares/upload")

router.post('/createEvent',authentication, EventController.createEvent)
router.put('/updateEvent/:_id', authentication, EventController.updateEvent)
router.put('/joinEvent/:_id', authentication, EventController.joinEvent)
router.delete('/deleteEvent/:_id', EventController.deleteEvent)
router.get('/getAll', authentication, EventController.getAllEvents)
router.get('/getById/:_id', authentication, EventController.getById)
router.get('/getMyEvents', authentication, EventController.getMyEvents)
router.get('/getRecommendations', authentication, EventController.getRecommendations)

//Para data science
router.get('/dataGetAll', dataAuthentication, EventController.dataGetAll)

module.exports = router;