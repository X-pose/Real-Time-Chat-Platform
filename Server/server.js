/**
 * @description - Initiating HTTP server and listning to incoming http requests
 */

//Imports and Requires
const http = require('http')
const app = require('./app')
const logger = require('./config/logger')
require('dotenv').config()

logger.logsInto.log('info', 'Server Js executing... Initiating HTTP server')
const port = process.env.PORT


//Creates HTTP server
const server = http.createServer(app)

//Server runs on port (4000)
server.listen(port, () => {
    logger.logsInto.log('info', `Server is running on port ${port}`)
    console.log(`Server is running on port ${port}`)

})