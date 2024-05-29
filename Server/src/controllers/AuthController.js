/**
 * @description - Authentication related business logic handled here
 * @functionality - extract JSON payload, setting response header, authentication, and setting up JWT tokens to the response headers
 */

require('dotenv').config()
const userModel = require('../models/UserModel')
const logger = require('../../config/logger')
const HttpStatus = require('../enums/httpStatus')
const bcryptjs = require("bcryptjs")
const saltCount = 10;
const {getAccessToken,getRefreshToken} = require('./JWTController')

const hashPasswordGen = async (plainPsw) => {
    const hashPsw = await bcryptjs.hash(plainPsw, saltCount);
    return hashPsw;
  };




exports.login = async (req, res) => {

    const payload = req.body
    let foundUser

    try {
        foundUser = await userModel.findOne({$or: [
            { username: payload.usernameOrEmail },
            { email: payload.usernameOrEmail }
          ]})
        
    } catch (error) {
        logger.logsInto.log('error', 'Internal server error at AuthController. More details : ' + error)
        return { status: HttpStatus.INTERNAL_SERVER_ERROR, body: error }
    }

    if (foundUser.status === HttpStatus.OK) {
        const retrivedUser = foundUser.body

        if (retrivedUser) {
            
            // Check whether passwords match.
            const checkPswMatch = await bcryptjs.compare(
                payload.password,
                retrivedUser.password
              );
            //if password matches, authenticate the user with JWT Token
            if (checkPswMatch === true) {

                //Setting up the JWT tokens. Access token contains userID and user type. Expires in 1 hour. Refresh token only store the user id. Expires in 3 months
                const accessToken = getAccessToken(retrivedUser._id,retrivedUser.type)
                const refreshToken = getRefreshToken(retrivedUser._id)

                //Setting the response header with OK and dispatching the JWT Tokens in a JSON body
                res.status(HttpStatus.OK).json({ accessToken: accessToken, refreshToken: refreshToken })
            } else {
                //If password didn't match, unauthorize the login request
                res.status(HttpStatus.UNAUTHORIZED).json({ body: "User authentication failed!" })
            }
        } else {
            res.status(HttpStatus.UNAUTHORIZED).json({ body: "User authentication failed!" })
        } 

    } else {
        //if user not found sets request headers to unauthorized and sends authentication failed message to the client 
        res.status(HttpStatus.UNAUTHORIZED).json({ body: "User authentication failed!" })
    }


}