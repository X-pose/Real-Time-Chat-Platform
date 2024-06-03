/**
 * @description - This component handles the logging out logic
 */

//Imports
import React from 'react'
import logoutImg from '../assets/logOutCircle.svg'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
 
    const navigate = useNavigate()
    
    const handleLogOut = async () => {

        //Removing JWT token to revoke authorization
        await localStorage.removeItem('accessToken')
        await localStorage.removeItem('refreshToken')
    
        navigate('/login') //Redirecting the user to login page after logging out
    
      }
    

    return (
        <div className='  cursor-pointer absolute flex w-screen h-fit bottom-10 right-20 justify-end  ' onClick={handleLogOut}>
            <div className='w-fit h-fit flex mr-4'>
                <img src={logoutImg} />
            </div>
            <div className='flex items-center'>
                <span className='hover:scale-105 font-FuturaMdBt text-white font-medium text-2xl text-decoration-line: underline underline-offset-2'>logout</span>
            </div>
        </div>
    )
}