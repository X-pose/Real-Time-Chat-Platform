/**
 * @description - Entry point to the Express server 
 */

// Imports and requires
const AppExpress = require('express')
const cors = require('cors')
const http = require('http')
const {Server} = require('socket.io')
const logger = require('./config/logger')
const chatRealTimeController = require('./src/controllers/ChatRealTimeController')
const appRouter = AppExpress.Router()
const connectDB = require('./config/database')
const { applyRateLimiter } = require("./utils/rateLimiter")
const jwt = require('jsonwebtoken')
const { authenticateRequest } = require("./utils/requestAuthenticator")
require('dotenv').config()

// Creating an instance of Express
const app = AppExpress()
const port = process.env.PORT || 4000 //A default port is set provided as a fail-safe

// Creating HTTP server
const httpServer = http.createServer(app)

// Enable cross-origin requests
app.use(cors())

// Creating a web socket for httpServer with socket.io
const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.use((socket, next) => {
    // Get the token from the socket handshake headers
    const token = socket.handshake.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return next(new Error('Missing token'));
    }
  
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err.message);

        return next(new Error('Invalid token'));
      }
      // Attach the decoded user info to the socket object
      socket.user = decoded;
      next();
    });
  });
  
  // On create 
  io.on("connection", (socket) => {
    console.log("User " + socket.id + " connected");
    chatRealTimeController(socket, io);
  });
  

// Establish MongoDB connection
connectDB.getInstance()



// Middleware setup
app.use(AppExpress.json())
app.use('/', appRouter)

// Requires - Route classes
const authRoutes = require('./src/routes/authRoutes')
const conversationRoutes = require('./src/routes/conversationRoutes')
const tokenRoutes = require('./src/routes/tokenRoutes')

// Set routes
app.use('/api/auth',applyRateLimiter, authRoutes)
app.use('/api/conversations', authenticateRequest, conversationRoutes)
app.use('/api/token',authenticateRequest,tokenRoutes)

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
