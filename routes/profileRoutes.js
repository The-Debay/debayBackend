const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController');
const { protectRoute } = require('../middleware/Middleware');


router.post('/profile',[protectRoute],profileController.createProfile)
router.get('/profile',[protectRoute],profileController.getProfile)
router.put('/profile',[protectRoute],profileController.updateProfile)
router.get('/country',profileController.getAllCountries)

module.exports = router;