const userModel = require("../models/UserModel");
const HttpStatus = require('../enums/httpStatus')
const logger = require('../../config/logger')

let msgQueue = [];

exports.addClientMsg = (msg) => {
    const newMsg = {
        message: msg,
        type: 'client',
        createdAt: Date.now()
    };

    console.log(newMsg);

    msgQueue.push(newMsg);

    console.log("Msg Queue : ", msgQueue);
};

exports.addBotMsg = (msg) => {
    const newMsg = {
        message: msg,
        type: 'bot',
        createdAt: Date.now()
    };

    console.log(newMsg);

    msgQueue.push(newMsg);

    console.log("Msg Queue : ", msgQueue);
};

exports.saveConversation = async (clientID) => {
    const conversation = {
        messages: msgQueue,
        updatedAt: Date.now() 
    };

    if(msgQueue.length > 1){
        try {
            // Append the new conversation to the existing conversations array
            const updatedConversation = await userModel.findByIdAndUpdate(
                clientID,
                { $push: { conversations: conversation } },
                { new: true } // return the updated document
            );
    
            console.log(updatedConversation);
    
            // Clear the msgQueue after saving the conversation
            msgQueue = [];
        } catch (error) {
            console.log(error);
        }
    }
    
};

exports.getConversations = async(userID, res) => {
    
    try {
        const userDetails =  await userModel.findById(userID)

        const conversationList = userDetails.conversations

        res.status(HttpStatus.OK).json(conversationList)
    } catch (error) {
        logger.logsInto.error(error)
        console.log(error)
    }
}
