import React, { useState, useContext  } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { CaptainDataContext } from "../context/Captaincontext"

const CaptainLogin = () => {
  const [email, setEmail] = useState(' ')
  const [password, setPassword] = useState('')

  const { captain, setCaptain} = useContext(CaptainDataContext)
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const caption = {
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captions/login`, caption);
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        setCaptain(data.caption);
        localStorage.setItem('token', data.token);
        navigate('/CaptainHome');
        return;
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setEmail('');
      setPassword('');
    }
    setEmail('')
    setPassword('')
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between bg-white'>
      <div>
        <img className='w-20 mb-6 drop-shadow-md' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="Uber Driver Icon" />
        <form onSubmit={(e) => {
          submitHandler(e)
        }}>

          <h3 className='text-lg font-medium mb-2 text-gray-800'>What's your email?</h3>

          <input
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className='bg-[#f6f6f6] mb-7 rounded px-4 py-2 border border-gray-300 w-full text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-black'
            placeholder='email@example.com' />

          <h3 className='text-lg font-medium mb-2 text-gray-800'>Enter Password</h3>

          <input
            type="password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            className='bg-[#f6f6f6] mb-7 rounded px-4 py-2 border border-gray-300 w-full text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-black'
            placeholder='Password ' />
          <button className='bg-black hover:bg-gray-900 transition-all duration-200 text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg shadow-md'>Login</button>

          <p className="text-sm text-gray-600 text-center">
            Ready to drive your success?{" "}
            <Link to="/captainsignup" className="text-black hover:underline font-medium">
              Become a Captain today!
            </Link>
          </p>
        </form>
      </div>

      <div>
        <div>
          <Link to='/signup' className='bg-[#29a872] hover:bg-[#249a68] transition-all duration-200 flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg shadow-md'>Sign in as User</Link>
        </div>
      </div>
    </div>
  )
}

export default CaptainLogin
