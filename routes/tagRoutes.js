const express = require('express')
const router = express.Router()
const tagController = require("../controllers/tagController");
const { protectRoute } = require('../middleware/Middleware');

 router.post('/tag', [protectRoute], tagController.createTag)
 router.get('/tag', [protectRoute], tagController.getAllTags)
 router.get('/tag/:id', [protectRoute], tagController.getTag)
 router.delete('/tag/:id', [protectRoute], tagController.deleteTag)
 router.put('/tag/:id', [protectRoute], tagController.updateTag)

module.exports = router;


