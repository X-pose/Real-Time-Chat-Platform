import { FaUser } from "react-icons/fa"
import React from 'react'
import { RiRobot3Fill } from 'react-icons/ri'


export default function MessageDisplayComponent({ messages }) {

    return (
        <div className='w-full h-full flex justify-between overflow-y-auto scrollbar-hide'>
            <ul id="messages" className='w-full flex flex-col sm:mx-10'>
                {messages.map((msg, index) => (
                    <li
                        key={index}
                        className={`px-10 rounded-full py-1 w-fit flex text-[#252525] font-medium font-FuturaMdBt text-lg my-2 ${msg.startsWith('bot:') ? 'self-start' : 'self-end'}`}
                    >
                        {msg.startsWith('bot:') ? (
                            <div className="flex items-center">
                                <RiRobot3Fill className="mr-2" />
                                <span className='mr-2'>: </span>
                                {msg.slice(4)} {/* Display the message after 'bot:' */}
                            </div>
                        ) : (
                            <div className="flex items-center">

                                {msg}
                                <span className='mr-2'>: </span>
                                <FaUser className='ml-2' />
                            </div>

                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}
