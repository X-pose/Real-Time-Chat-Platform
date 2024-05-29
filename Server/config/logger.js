/**
 * @description - Logger configuration file. Winston used as the logger
 */

//Requires
const { createLogger, transports, format } = require('winston')

const logsInto = createLogger({
    transports: [
        //logger transporter for loggin general information
        new transports.File({
            filename: 'Server-Ops.log',
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        }),

        //logger transporter for loggin errors 
        new transports.File({
            filename: 'Server-Errors.log',
            level: 'error',
            format: format.combine(format.timestamp(), format.json())
        })

    ]
})

module.exports = {logsInto}