import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:4000') // Ensure this URL matches your server

function App() {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
   

    useEffect(() => {
        socket.on('chat message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg])
        })
        socket.on('bot message', (botMsg) =>{
            setMessages((prevBotMessages) => [...prevBotMessages, botMsg])
        })

        return () => {
            socket.off('chat message')
        }
    }, [])

    const sendMessage = (e) => {
        e.preventDefault()
        if (message) {
            socket.emit('chat message', message)
            setMessage('')
        }
    }

    return (
        <div className=" bg-slate-800 w-screen h-screen flex justify-center items-center">
          <div className=' bg-slate-400'>
          <ul id="messages">
                {messages.map((msg, index) => (
                    <li key={index} className=' bg-white px-10 py-1 rounded my-2'>{msg}</li>
                ))}
            </ul>
           
          </div>
           

            <form id="form" onSubmit={sendMessage}>
                <input
                    id="input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    autoComplete="off"
                />
                <button>Send</button>
            </form>
        </div>
    )
}

export default App
