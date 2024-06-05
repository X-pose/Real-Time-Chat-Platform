const {getBotResponse} = require("./OpenAIController")
const {addBotMsg,addClientMsg,saveConversation} = require('../controllers/ChatStorageController')


module.exports = (socket, io) => {
    socket.on('disconnect', async() => {
        console.log("user "+socket.id+" disconnected")
       await saveConversation(socket.user.userId)
    })

    const getReply = async(msg)=> {
        //Getting openAI response for the chat
        let reply

        reply = await getBotResponse(msg)

        //If there's an error, echo back client msg with error contex
        if(reply === "Failed to parse response from OpenAI API"){
            reply = 'bot: Failed to get a server reply to : '+msg
        }
    
        return reply
    }

    
    socket.on ('chat message', async(msg) => {

        console.log('message: ' + msg + 'From : ' + socket.user.userId)

        addClientMsg(msg)
        const reply = await getReply(msg)
        addBotMsg(reply)
        
        socket.emit('chat message', msg)
        socket.emit('bot message', reply)
    })

  
}
