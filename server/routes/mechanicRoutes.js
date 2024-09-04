const express = require('express');
const { getAssignedJobs, updateMechanicAvailability, provideFeedback } = require('../controllers/mechanicController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/jobs', authMiddleware, getAssignedJobs);


router.put('/availability', authMiddleware, updateMechanicAvailability);


router.post('/:id/feedback', authMiddleware, provideFeedback);

module.exports = router;
