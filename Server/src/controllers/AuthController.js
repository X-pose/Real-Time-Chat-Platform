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
const { getAccessToken, getRefreshToken } = require('./JWTController')

const hashPasswordGen = async (plainPsw) => {
    const hashPsw = await bcryptjs.hash(plainPsw, saltCount);
    return hashPsw;
};


exports.register = async (req, res) => {
    const payload = req.body

    const newUser = {

        email: payload.email,
        password: await hashPasswordGen(payload.password),
        type: payload.type
    }


    try {
        const response = await userModel.create(newUser)

        //Automatated login upon succesfull registration
        await this.login(req, res)

    } catch (error) {

        logger.logsInto.log('error', 'Internal server error at createUser(). More details : ' + error)
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ body: error })
    }

}

exports.login = async (req, res) => {

    const payload = req.body

    try {
        const foundUser = await userModel.findOne({ email: payload.email })

        if (foundUser) {

            // Check whether passwords match.
            const checkPswMatch = await bcryptjs.compare(
                payload.password,
                foundUser.password
            );
            //if password matches, authenticate the user with JWT Token
            if (checkPswMatch === true) {

                //Setting up the JWT tokens. Access token contains userID and user type. Expires in 1 hour. Refresh token only store the user id. Expires in 3 months
                const accessToken = getAccessToken(foundUser._id, foundUser.type)
                const refreshToken = getRefreshToken(foundUser._id)

                //Setting the response header with OK and dispatching the JWT Tokens in a JSON body
                res.status(HttpStatus.OK).json({ accessToken: accessToken, refreshToken: refreshToken })
            } else {
                //If password didn't match, unauthorize the login request
                res.status(HttpStatus.UNAUTHORIZED).json({ body: "User authentication failed! Password mismatch" })
            }


        } else {
            //if user not found sets request headers to unauthorized and sends authentication failed message to the client 
            res.status(HttpStatus.UNAUTHORIZED).json({ body: "User authentication failed!" })
        }

    } catch (error) {
        logger.logsInto.log('error', 'Internal server error at AuthController. More details : ' + error)
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ body: error })
    }




}