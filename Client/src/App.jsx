import React from 'react'
import {Route , Routes , BrowserRouter as Router} from 'react-router-dom'

import AuthenticationPage from './pages/authenticationPage'
import ChatPage from './pages/chatPage'



function App() {
 
  return (
    <Router>
      <Routes>
      
        <Route path ="/" element = {<AuthenticationPage/>} />
        <Route path ="/chat" element = {<ChatPage/>} />
       
      </Routes>
    </Router>
  )
}

export default App
