const express = require('express')
const router = express.Router();
const authController = require("../controller/authController")
const authMiddleware = require("../middleware/Middleware")



router.post('/signup',authController.signUp)
router.post('/login',authController.login)
router.get('/check-username/:username',authController.checkUsernameExist)
router.post('/profile',[authMiddleware.protectOtpAuthentication],authController.createProfile)
router.get('/profile',[authMiddleware.protectOtpAuthentication],authController.getProfile)
router.put('/profile',[authMiddleware.protectOtpAuthentication],authController.updateProfile)




module.exports = router