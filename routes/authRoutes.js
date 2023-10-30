const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const authMiddleware = require('../middleware/Middleware')


router.post('/signup',authController.signUp)
router.post('/login',[authMiddleware.checkEmailVerified],authController.login)
router.get('/check-username/:username',authController.checkUsernameExist)
// router.post('/profile',[authMiddleware.protectOtpAuthentication],authController.createProfile)
// router.get('/profile',[authMiddleware.protectOtpAuthentication],authController.getProfile)
// router.put('/profile',[authMiddleware.protectOtpAuthentication],authController.updateProfile)
router.post('/verify-email',authController.verifyEmailOtp)
router.post('/generate-otp',[authMiddleware.checkOtpTime],authController.generateNewOtp)

// router.post("/forgotPassword", userController.forgotPassword)
// router.post("/resetPassword", userController.resetPassword)


module.exports = router;