import React, { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import MessageDsiplayComponent from '../components/MessageDisplayComponent'

const token = localStorage.getItem('accessToken')

const socket = io('http://localhost:4000',{
    extraHeaders: {
        Authorization: `Bearer ${token}`
      }
}) 

function ChatPage() {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const textareaRef = useRef(null)

    useEffect(() => {
        socket.on('chat message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg])
        })
        socket.on('bot message', (botMsg) => {
            setMessages((prevBotMessages) => [...prevBotMessages, botMsg])
        })

        return () => {
            socket.off('chat message')
            socket.off('bot message')
        }
    }, [])

    useEffect(() => {
        const textarea = textareaRef.current
        if (textarea) {
            textarea.style.height = 'auto'
            textarea.style.height = `${textarea.scrollHeight}px`
        }
    }, [message])

    const sendMessage = (e) => {
        e.preventDefault()
        if (message) {
            socket.emit('chat message', message)
            setMessage('')
        }
    }

    return (

        <div className=" bg-slate-700 w-screen h-screen flex  items-center">

            <div className=' w-1/4 bg-slate-900 h-full'></div>
            <div className='w-full  h-screen flex flex-col items-center justify-end'>
                <div className=' my-5 font-FutuBd text-white text-4xl '> SupportU </div>
                <MessageDsiplayComponent messages={messages}/>



                <div className=' w-full px-10 mb-10 '>
                    <form id="form" onSubmit={sendMessage}>
                        <div className=' flex flex-row items-end  justify-between px-10  py-2 w-full h-fit rounded-3xl shadow bg-slate-600 font-FutuBd text-white'>
                            <textarea className='focus:outline-0  appearance-none bg-inherit w-full h-fit'
                                ref={textareaRef}
                                id="input"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                autoComplete="off"
                            />
                            <button className=' ml-5 py-2'>Send</button>
                        </div>


                    </form>
                </div>
            </div>


        </div>
    )
}

export default ChatPage
