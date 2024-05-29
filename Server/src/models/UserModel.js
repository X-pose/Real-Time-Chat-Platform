/**
 * @description - This file defines the user model for mongoDB
 *  In here messages are stored as an array under user to reduce query time of the alternative options (Such as maintaining a dedicated collection for the messages)
 */

const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    message: {
      type: String,
      required: false
    },
    type: {
      type: String,
      enum: ['client', 'bot'],
      required: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type : {type : String, enum : ['client', 'admin']},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    messages: [messageSchema]
  },{collection : 'User'})

//Creating mongoose model using Schema
const userModel = mongoose.model('UserModel', userSchema)

//Exporting model 
module.exports = userModel