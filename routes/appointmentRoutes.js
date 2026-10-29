const express = require('express');
const AppointmentController = require('../controllers/AppointmentController');
const verifyToken = require('../middlewares/VerifyToken');

const router = express.Router();

router.post(
    '/',
    verifyToken,
    AppointmentController.criar
);

router.get(
    '/',
    verifyToken,
    AppointmentController.listar
);

module.exports = router;