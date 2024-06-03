import React, { useState} from 'react'
import Login from '../components/LoginComponent'
import Registration from '../components/RegisterComponent'

function AuthenticationPage(){

    const [showLogin, setShowLogin] = useState(true)


    const toggleView = () => {
      setShowLogin(!showLogin);
    };
    
    
  
    return (
        <div className='w-screen h-screen flex justify-center bg-slate-500 overflow-hidden'>
    
          <div className="  w-screen h-screen flex justify-center items-center flex-col">
            {showLogin ?
              <Login toggleView = {toggleView}/>
              :
              <Registration toggleView = {toggleView}/>
            }
          </div>
          
        </div>
      )
}

export default AuthenticationPage