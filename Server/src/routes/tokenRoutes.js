/**
 * @description - Route file responsible for the token regeneration process
 */

//Requires
const express = require('express')
const router = express.Router()
const { generateNewAccessToken } = require('../controllers/JWTController')

//Route for token regeneration
router.get('/v1', async (req, res) => {
    generateNewAccessToken(req, res)
})


//Exporting router to be used by the app.js
module.exports = router