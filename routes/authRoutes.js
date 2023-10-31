const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const authMiddleware = require('../middleware/Middleware')


router.post('/signup',authController.signUp)
router.post('/login',[authMiddleware.checkEmailVerified],authController.login)
router.get('/check-username/:username',authController.checkUsernameExist)

router.post('/verify-email',[authMiddleware.checkUserExistOrNot],authController.verifyEmailOtp)
router.post('/generate-otp',[authMiddleware.checkUserExistOrNot, authMiddleware.checkNewOtpTime],authController.generateNewOtp)

module.exports = router;    