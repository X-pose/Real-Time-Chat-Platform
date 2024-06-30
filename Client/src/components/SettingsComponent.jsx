
import React, { useEffect, useState } from 'react'

import { MdModeEdit } from "react-icons/md"
import TextField from '@mui/material/TextField'
import { LuSave } from "react-icons/lu";

export default function SettingsComponent({userData}) {

   
    const [showEdit, setShowEdit] = useState(false)
    const [updatedName, setUpdatedName] = useState(userData.username)

    

    const handleUsernameChange = (e) => {
        setUpdatedName(e.target.value)
    }

    const handleUpdate = async() => {


        setShowEdit(false)
    }




    return (
        <div className=' flex flex-col items-center justify-center'>
            <p>Settings</p>
            <div className='flex h-fit justify-center items-center'>
                <p className={`font-FutuBd text-2xl ${showEdit ? 'hidden' : 'flex'}`}>{userData.username}</p>
                <TextField className={` ${showEdit ? 'flex':'hidden'} placeholder-[#083F46] ::placeholder font-FuturaMdBt w-[calc(100vw-2.5rem)] sm:w-full  mt-5 bg-white font-normal text-[#083F46] rounded-lg`}
                    type="text"
                    id="username"
                    name="username"
                    label="Update username"
                    value={updatedName}
                    onFocus={() => setUpdatedName('')}
                    onChange={handleUsernameChange}


                />
                <MdModeEdit className={` ${showEdit ? 'hidden':'flex'} cursor-pointer ml-5`} onClick={() => setShowEdit(true)} />
                <LuSave className={` ${showEdit ? 'flex':'hidden'} ml-5 mt-5 cursor-pointer text-2xl `} onClick={() => handleUpdate()} />
                
            </div>

            <p className=' font-FuturaMdBt text-lg'>{userData.email}</p>
        </div>
    )
}