/**
 * @description - Entry point to the Express server 
 */

// Imports and requires
const AppExpress = require('express')
const cors = require('cors')
const http = require('http')
const {Server} = require('socket.io')
const logger = require('./config/logger')
const socketController = require('./src/controllers/SocketController')
const appRouter = AppExpress.Router()
const connectDB = require('./config/database')
const { applyRateLimiter } = require("./utilis/rateLimiter")
const { authenticateRequest } = require("./utilis/requestAuthenticator")
require('dotenv').config()

// Create an instance of Express
const app = AppExpress()
const port = process.env.PORT || 4000 // Ensure a default port is set

// Create HTTP server
const httpServer = http.createServer(app)

// Enable cross-origin requests
app.use(cors())

const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  
  io.on("connection", (socket) => {
    console.log("Socket is live and connected");
    socketController(socket, io);
  });
  

// Establish MongoDB connection
connectDB.getInstance()



// Middleware setup
app.use(AppExpress.json())
app.use('/', appRouter)

// Requires - Route classes
const authRoutes = require('./src/routes/authRoutes')
const SocketController = require('./src/controllers/SocketController')

// Set routes
app.use('/api/auth', authRoutes)

// Error handling for the server
httpServer.on('error', (error) => {
    logger.logsInto.log('error', `Server error: ${error.message}`)
    console.error(`Server error: ${error.message}`)
})

// Start the server
httpServer.listen(port, () => {
    logger.logsInto.log('info', `Server is running on port ${port}`)
    console.log(`Server is running on port ${port}`)
})

// Exporting app to be used by other modules if needed
module.exports = app
