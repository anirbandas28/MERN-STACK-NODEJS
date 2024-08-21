const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api-controller');

router.get('/user/list', apiController.getUser);
// router.post('/user/create', apiController.createUser);
router.post('/user/add', apiController.addUser);
router.get('/user/info/:id', apiController.getSingleUser);
router.post('/user/update', apiController.updateUser);
router.post('/user/delete/:id', apiController.deleteUser);

router.post('/login', apiController.login);
router.post('/signup', apiController.signUp);
module.exports = {
    route:router
}
