/**
 * @description - Entry point to the Express server 
 */

//Imports and requires
const AppExpress = require('express')
const cors = require('cors')
const app = AppExpress()
const appRouter = AppExpress.Router()
const connectDB = require('./config/database')
const { applyRateLimiter } = require("./utilis/rateLimiter");
const { authenticateRequest } = require("./utilis/requestAuthenticator");

//Requires - Route classes 
const authRoutes = require('./src/routes/authRoutes')


//Establishing MongoDB connection
connectDB.getInstance()

//Enables cross origin requests
app.use(cors());

app.use(AppExpress.json())
app.use('/', appRouter)

//Set routes
app.use('/api/auth', authRoutes)


//Exporting app to be used by the server.js
module.exports = app