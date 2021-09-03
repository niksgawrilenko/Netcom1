const express = require('express');

const {authMiddleware} = require('./middlewares/authMiddleware');
const {getUserProfileInfo, changeUserBalans, updateUser, getUser} = require('../controllers/usersController');

const router = new express.Router();

router.get('/', authMiddleware, getUserProfileInfo);
router.patch('/balans', authMiddleware, changeUserBalans);
router.put('/', updateUser);
router.post('/getUser', getUser);

module.exports = router;
