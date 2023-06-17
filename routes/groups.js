const express = require('express');
const GroupController = require('../controllers/GroupController');
const {authentication} = require('../middlewares/authentication')
const router = express.Router()


router.post('/create',authentication, GroupController.create)
router.put('/update/:_id', authentication, GroupController.update)
router.get('/getAll',authentication, GroupController.getAllGroups)
router.get('/getById/:_id',authentication, GroupController.getById)
router.delete('/delete/:_id',authentication, GroupController.delete)


module.exports = router;