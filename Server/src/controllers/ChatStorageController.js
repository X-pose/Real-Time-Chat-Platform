const userModel = require("../models/UserModel");

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
};
