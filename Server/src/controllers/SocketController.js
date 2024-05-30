const {getBotResponse} = require("../controllers/OpenAIController")
module.exports = (socket, io) => {
    socket.on('disconnect', () => {
        console.log("user "+socket.id+" disconnected")
    })

    const getReply = async(msg)=> {
        //Getting openAI response for the chat
       // const reply = await getBotResponse(msg)
        return reply
    }

    
    socket.on ('chat message', async(msg) => {
        console.log('message: ' + msg)

        //const reply = await getReply(msg)

        socket.emit('chat message', msg)
        socket.emit('bot message', "reply msg")
    })

  
}
