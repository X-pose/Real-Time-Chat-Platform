/**
 * @description - This component handles the login logic
 */

//imports
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'



export default function Login({ toggleView }) {

  const navigate = useNavigate()
  //States
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [authenticateError, setAuthenticateError] = useState('')
  

  //State change handlers
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

 //Validating password to ensure it has at least 8 characters.
  const validatePassword = () => {

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long')
      return false
    } else {
      setPasswordError('')
      return true
    }
  }

  //Sending login request to the server
  const handleSubmit = async (e) => {
    e.preventDefault()

    //validating user inputs 
    const validPassword = validatePassword()


    if (validPassword) {
     
      const payload = {
        email: email,
        password: password
      }

      await axios.post('http://localhost:4000/api/auth/v1/login', payload).then(res => {

      const accessToken = res.data.accessToken
      const refreshToken = res.data.refreshToken

      //Storing both accessToken and RefreshToken in browser local storage
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)

      navigate('/chat')

      }).catch(error => {
        setAuthenticateError("User authentication failed!")
        console.log('Axios error in login : ' + error)
      })
    }
  }

  return (

    <div className='w-fit h-fit sm:w-3/6 md:w-[400px] '>
      <div className=' w-fit h-fit text-white flex flex-col justify-start px-10 sm:px-0 items-start'>
        <span className=' font-FutuBd font-bold text-2xl'>Hi there,</span>
        <br />
        <span className=' font-FuturaMdBt font-normal text-xl '>Welcome to our <br /> AI powered chat bot</span>
      </div>
      <div>
        <form onSubmit={handleSubmit} className=' w-full flex flex-col items-center ' >
          <div className='w-full'>
            <input className='placeholder-[#083F46] ::placeholder font-FuturaMdBt w-[calc(100vw-2.5rem)] sm:w-full h-10 pl-10 mt-10  bg-white font-normal text-[#083F46] rounded-3xl'
              type="email"
              id="email"
              name="email"
              value={email}
              onFocus={() => setEmail('')}
              onChange={handleEmailChange}
              placeholder='e-mail'
              required
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>
          <div className='w-full'>
            <input className=' placeholder-[#083F46] ::placeholder font-FuturaMdBt w-[calc(100vw-2.5rem)] sm:w-full h-10 pl-10 mt-5 bg-white font-normal text-[#083F46] rounded-3xl'
              type="password"
              id="password"
              name="password"
              value={password}
              onFocus={() => setPassword('')}
              onChange={handlePasswordChange}
              placeholder='password'
              required
            />
            {passwordError && <p className=" text-red-500">{passwordError}</p>}
          </div>
          <div className=' w-full px-10 sm:px-0 mt-10 flex flex-col items-center '>
            <button type="submit" className=' hover:border-green-500 font-FuturaMdBt w-full h-fit pl-8 pr-8 py-1 text-[0.85rem] sm:text-lg  font-medium text-white border-white border-2 rounded-3xl'> login</button>
            <span className='font-FuturaMdBt ml-4 mr-4 text-white font-medium'>or</span>
            <span onClick={toggleView} className='cursor-pointer font-FuturaMdBt text-white text-[0.85rem] sm:text-sm font-medium text-decoration-line: underline underline-offset-2 '>Click here to Register</span>
          </div>
          {authenticateError && <p className=" text-red-500">{authenticateError}</p>}
        </form>
      </div>
    </div>

  )
}
