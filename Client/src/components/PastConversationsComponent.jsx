import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { IoChatbubblesOutline } from "react-icons/io5"


export default function PastConversationsComponent({ getMessages }) {


  const [convoList, setConvoList] = useState([])

  useEffect(() => {
    getPastConversations()
  }, [])

  const getPastConversations = async () => {

    const token = localStorage.getItem('accessToken')
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }


    await axios.get('http://localhost:4000/api/conversations/v1/', config).then(res => {

      setConvoList(res.data)
      console.log(res.data)

    }).catch(error => {
      console.log(error)
    })
  }


  const prepareSelectConvo = (index) => {
    const selectedConvo = convoList[index]
    const messages = selectedConvo.messages.map(msg => msg.message)

    getMessages(messages)

  }



  return (
    <div>
      <Divider />
      <List >
        {convoList.filter(messages => messages.messages.length > 0).map((messages, index) => (
          <ListItem key={index} >
            <ListItemButton onClick={() => prepareSelectConvo(index)}>
              <ListItemIcon>
                <IoChatbubblesOutline className=' size-5' />
              </ListItemIcon>

              <ListItemText primary={messages.messages[0].message} style={{maxWidth:'200px',overflow:'hidden'}} />

            </ListItemButton>
            <Divider />
          </ListItem>
        ))}
      </List>
    </div>

  )
}