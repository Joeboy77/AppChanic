const express = require('express');
const { reportFaultyCar, getUserCars, updateCarStatus } = require('../controllers/carController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/', authMiddleware, reportFaultyCar);


router.get('/', authMiddleware, getUserCars);


router.put('/:id', authMiddleware, updateCarStatus);

module.exports = router;
