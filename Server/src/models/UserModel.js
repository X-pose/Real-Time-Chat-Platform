/**
 * @description - This file defines the user model for mongoDB
 *  In here messages are stored as an array under user to reduce query time of the alternative options (Such as maintaining a dedicated collection for the messages)
 */

const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
 
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

const conversationSchema = new mongoose.Schema({
  
  messages: [messageSchema],
  createdAt:{type : Date, default: Date.now},
  updatedAt : {type : Date, default: Date.now}
})

const userSchema = new mongoose.Schema({

    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type : {type : String, enum : ['client', 'admin']},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    conversations : [conversationSchema]
  },{collection : 'User'})

//Creating mongoose model using Schema
const userModel = mongoose.model('UserModel', userSchema)

//Exporting model 
module.exports = userModel