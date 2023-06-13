const express = require('express');
const GroupController = require('../controllers/GroupController');
const {authentication, isAdmin, dataAuthentication} = require('../middlewares/authentication')
const router = express.Router()


router.post('/create',authentication, GroupController.create)
router.put('/update/:_id', authentication, GroupController.update)
router.get('/getAll',authentication, GroupController.getAll)
router.get('/getById/:_id',authentication, GroupController.getById)
router.delete('/delete/:_id',authentication, GroupController.delete)


//Para data science


module.exports = router;