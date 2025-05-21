const express = require('express');
const auth = require('../../middelwares/auth');
const account = require('./account')

const router = express.Router();
const { login } = require('../account/authController'); 

router.get('/', auth, account.index)
router.get('/view/:id', auth, account.view)
router.post('/add', auth, account.add)
router.post('/addMany', auth, account.addMany)
router.put('/edit/:id', auth, account.edit)
router.delete('/delete/:id', auth, account.deleteData)
router.post('/deleteMany', auth, account.deleteMany)
router.post('/user/login', login);



module.exports = router