const express = require('express')
const router = express.Router();
const authController = require("../controller/authController")
const authMiddleware = require("../middleware/Middleware")



router.post('/signup',authController.signUp)
router.post('/login',authController.login)
router.get('/profile',[authMiddleware.protectOtpAuthentication],authController.profile)
router.get('/check-username/:username',authController.checkUsernameExist)


module.exports = router