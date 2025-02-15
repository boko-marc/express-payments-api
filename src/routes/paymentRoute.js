const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
router.post('/initiate', paymentController.initializePayment);
router.get('/verify', paymentController.verifyPayment);

module.exports = router;