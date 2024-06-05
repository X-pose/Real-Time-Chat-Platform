/**
 * @description - Route file responsible for the conversation process
 */

//Requires
const express = require('express')
const router = express.Router()
const { getConversations } = require('../controllers/ChatStorageController')

//Route for login
router.get('/v1/', async (req, res) => {
    await getConversations(req.user.userId, res)
})

//Exporting router to be used by the app.js
module.exports = router