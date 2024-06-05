/**
 * @description - This component handles the logging out logic
 */

//Imports
import React from 'react'
import { RiLogoutCircleLine } from "react-icons/ri"
import { useNavigate } from 'react-router-dom'

export default function Logout() {

    const navigate = useNavigate()

    const handleLogOut = async () => {

        //Removing JWT token to revoke authorization
        await localStorage.removeItem('accessToken')
        await localStorage.removeItem('refreshToken')

        navigate('/') //Redirecting the user to login page after logging out

    }


    return (
        <div className='  cursor-pointer flex  justify-center h-fit w-fit group  ' onClick={handleLogOut}>

            
            <div className='w-fit h-fit flex '>
                <RiLogoutCircleLine className=' text-[#252525] group-hover:text-red-500 size-10'/>
            </div>
        </div>
    )
}