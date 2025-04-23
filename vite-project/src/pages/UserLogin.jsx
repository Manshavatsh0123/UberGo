import React, { useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/Usercontext";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});

  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();


  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home');
        return;
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setEmail('');
      setPassword('');
    }
    setEmail('');
    setPassword('');
  }


  return (
    <div className='py-5 px-5 h-screen flex flex-col justify-between bg-white '>
      <div>

        <img className='w-16 mb-10 drop-shadow-md' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
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
            className='bg-[#eeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            placeholder='Password ' />
          <button className='bg-black hover:bg-gray-900 transition-all duration-200 text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg shadow-md'>Login</button>

          <p className="text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <Link to='/signup' className="text-black hover:underline font-medium" href="#">
              Sign up now!
            </Link>
          </p>
        </form>
      </div>

      <div>
        <div>
          <Link to='/captainlogin' className='bg-[#29a872] hover:bg-[#249a68] transition-all duration-200 flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg shadow-md'>Login as Caption</Link>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
