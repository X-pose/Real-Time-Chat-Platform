// socketSingleton.js
import { io } from 'socket.io-client';

// Create a socket instance

let socket

const getSocket = () => {

    const token = localStorage.getItem('accessToken')

    if (!socket) {
        socket = io('http://localhost:4000', {
            extraHeaders: {
                Authorization: `Bearer ${token}`
            },
            reconnection: false
        })
    }
    return socket

}



export default getSocket;