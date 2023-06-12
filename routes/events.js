const express = require('express');
const EventController = require('../controllers/EventController');
const {authentication, isAdmin, dataAuthentication} = require('../middlewares/authentication')
const router = express.Router()
const { uploadEventImage } = require("../middlewares/upload")

router.post('/createEvent',authentication, EventController.createEvent)
router.put('/updateEvent/:_id', EventController.updateEvent)
router.put('/joinEvent/:_id', authentication, EventController.joinEvent)
router.delete('/deleteEvent/:_id', EventController.deleteEvent)
router.get('/getAll',EventController.getAllEvents)
router.get('/getById/:_id',EventController.getById)
router.get('/getMyEvents', authentication, EventController.getMyEvents)

//Para data science
router.get('/dataGetAll', dataAuthentication, EventController.dataGetAll)

module.exports = router;