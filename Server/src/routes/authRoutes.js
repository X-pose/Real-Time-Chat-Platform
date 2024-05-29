/**
 * @description - Route file responsible for the authentication process
 */

//Requires
const express = require('express')
const router = express.Router()
const { login, register } = require('../controllers/AuthController')

//Route for login
router.post('/v1/login', async (req, res) => {
    await login(req, res)
})

router.post('/v1/register', async(req,res) => {
    await register(req,res)
}) 


//Exporting router to be used by the app.js
module.exports = router