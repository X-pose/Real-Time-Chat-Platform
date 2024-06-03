import React from 'react'

export default function MessageDsiplayComponent({messages}) {

    console.log(messages)
    return (
        <div className=' w-full h-full flex  justify-between overflow-y-auto'>

            <ul id="messages" className='w-full flex flex-col  mx-10 '>
                {messages.map((msg, index) => (
                    <li key={index} className={`px-10 py-1 w-fit flex text-white font-medium font-FuturaMdBt text-lg my-2 ${msg.startsWith('bot:') ? 'self-start' : 'self-end'}`}>{msg.startsWith('bot:') ? msg.replace('bot:', '') : msg}</li>
                ))}
            </ul>


        </div>
    )
}