import React, { useState, useEffect, useRef } from 'react'
import getSocket from '../utils/socketIoSingleton';
import MessageDsiplayComponent from '../components/MessageDisplayComponent'
import PastConversationsComponent from '../components/PastConversationsComponent'
import LogoutComponent from '../components/LogoutComponent'
import { CiPaperplane } from "react-icons/ci"
import { useNavigate } from 'react-router-dom'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import { TextareaAutosize } from '@mui/base/TextareaAutosize'
import { jwtDecode } from 'jwt-decode'


const drawerWidth = 250;

function ChatPage() {
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const socketRef = useRef(null)
    const buttonRef = useRef(null)
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [isKeyPressed, setIsKeyPressed] = useState(false);


    //Drawer related functions
    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };


    if (!socketRef.current) {
        socketRef.current = getSocket()
    }

    const socket = socketRef.current;

    useEffect(() => {

        checkLoginState()



        socket.on('bot message', (botMsg) => {
            setMessages((prevBotMessages) => [...prevBotMessages, botMsg])
        })

        return () => {
            socket.off('chat message')
            socket.off('bot message')
        }
    }, [])




    //Check login state by checking token states for authorization purposes
    const checkLoginState = async () => {
        const refreshToken = localStorage.getItem('refreshToken')

        if (!refreshToken) {
            navigate('/') //If refresh token is not present redirect the user to login
        } else {
            const accessToken = localStorage.getItem('accessToken')

            if (accessToken && (accessToken !== undefined)) {
                try {

                    const decodedToken = jwtDecode(accessToken)


                    // getting expiration time in seconds
                    const currentTime = Date.now() / 1000

                    //If access token expired get a new accessToken
                    if (decodedToken.exp < currentTime) {

                        const newToken = await getNewAccessToken(refreshToken)
                        localStorage.setItem('accessToken', newToken)

                    }

                } catch {
                    console.log('Error at decoding JWT')
                }

            } else {
                //If accessToken is not present, generate a new one
                const newToken = await getNewAccessToken(refreshToken)
                localStorage.setItem('accessToken', newToken)
            }
        }

    }

    //Generate new access token
    const getNewAccessToken = async (refreshToken) => {

        let NewAccessToken
        const config = {
            headers: {
                'Authorization': `Bearer ${refreshToken}`
            }
        }
        console.log(config.headers)
        try {

        } catch (error) {

        }
        await axios.get('http://localhost:4000/api/token/v1', config).then(res => {

            NewAccessToken = res.data.accessToken


        }).catch(error => {
            console.log(error)
        })

        return NewAccessToken
    }


    const sendMessage = (e) => {
        e.preventDefault()
        if (message) {
            socket.emit('chat message', message)
            setMessages((prevMessages) => [...prevMessages, message])
            setMessage('')
        }
    }

    const handleSelectedConvo = (msgArray) => {

        setMessages(msgArray)
    }

    const handleEnterKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            buttonRef.current.click()
        }
    }



    const drawer = (
        <Box sx={{ backgroundColor: "rgb(224 224 224)", height: '100vh', minWidth:'245px' }}>
            <Toolbar >
                <Typography variant='h5' font-bold fontWeight={600} >Chat History</Typography>

            </Toolbar>
            <Box sx={{ height: 'calc(100% - 128px)', overflow: 'auto' }}>

                <PastConversationsComponent getMessages={handleSelectedConvo} />


            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                position: 'absolute',
                bottom: 0,
                right: 0,
                px: 5,
                pb: 5,
            }}>


            </Box>
            <Toolbar sx={{justifyContent:'flex-end'}}>
                <LogoutComponent />
            </Toolbar>

        </Box>
    )

    const handleKeyDown = () => {
        setIsKeyPressed(true);
    };

    const handleKeyUp = () => {
        setIsKeyPressed(false);
    };




    return (

        <div className=" bg-gray-200 w-screen h-screen flex  items-center">

            <Tooltip title="View chat history">
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',

                        display: { sm: 'none' }
                    }}
                >
                    <MenuIcon />
                </IconButton>
            </Tooltip>

            <Box

                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}

            >


                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },

                    }}
                    open
                >
                    {drawer}
                </Drawer>
                <Drawer

                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },

                    }}
                >
                    {drawer}
                </Drawer>
            </Box>


            <div className='w-full  h-screen flex flex-col items-center justify-end'>
                <div className=' my-5 font-FutuBd text-[#252525] w-full flex justify-center text-4xl  pb-2 '> <span className=' text-3xl sm:text-4xl'>SupportU.ai</span> </div>
                <MessageDsiplayComponent messages={messages} />



                <div className=' w-full sm:px-10 mb-2  flex justify-center shadow-[rgb(0,0,15,0.08)_0px_-10px_4px_0px] pt-2'>
                    <form id="form" onSubmit={sendMessage} className=' w-full flex justify-center'>

                    <div className={`flex flex-row items-center justify-between px-10 w-[80%] h-fit rounded-3xl border-2 ${isKeyPressed ? 'border-blue-500' : 'border-[#252525]'} shadow bg-gray-100 font-FuturaMdBt text-[#252525]`} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
                            <TextareaAutosize className='focus:outline-0  appearance-none bg-inherit mb-0 w-full'

                                id="input"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={handleEnterKeyDown}
                                autoComplete="off"
                                placeholder="let's talk..."
                            />
                            <button type='submit' ref={buttonRef} className=' ml-5 py-2 font-FutuBd'>
                                <CiPaperplane className=' text-[#252525] size-8' />
                            </button>
                        </div>


                    </form>
                </div>
            </div>


        </div>
    )
}

export default ChatPage
