import React, { useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {UserDataContext} from "../context/Usercontext";

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);


  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: { firstname, lastname },
      email: email,
      password: password
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
      if (response.status === 201) {
        const data = response.data
        setUser(data.user);
        localStorage.setItem('token',data.token);
        navigate('/home');
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }

    setPassword('');
    setFirstname('');
    setLastname('');
    setEmail('');

  }

  return (
    <div>
      <div className='p-7 h-screen flex flex-col justify-between bg-white font-sans'>
        <div>

          <img className='w-20 mb-6 drop-shadow-md' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>

            <h3 className='text-[17px] font-semibold mb-2 text-[#111]'>Enter your name to continue</h3>
            <div className='flex gap-4 mb-6'>
              <input
                type="text"
                name="firstname"
                autoComplete="given-name"
                required
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className='bg-[#f6f6f6] rounded px-4 py-3 border border-gray-300 w-1/2 text-[15px] placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-black'
                placeholder='Firstname'
              />

              <input
                type="text"
                name="lastname"
                autoComplete="family-name"
                required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className='bg-[#f6f6f6] rounded px-4 py-3 border border-gray-300 w-1/2 text-[15px] placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-black'
                placeholder='Lastname'
              />
            </div>

            <h3 className='text-[17px] font-semibold mb-2 text-[#111]'>Please provide your email address</h3>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className='bg-[#f6f6f6] mb-6 rounded px-4 py-3 border border-gray-300 w-full text-[15px] placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-black'
              placeholder='email@example.com' />

            <h3 className='text-[17px] font-semibold mb-2 text-[#111]'>Enter Password</h3>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              className='bg-[#f6f6f6] mb-6 rounded px-4 py-3 border border-gray-300 w-full text-[15px] placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-black'
              placeholder='Password ' />

            <button className='bg-[#000] hover:bg-[#111] transition-all duration-200 text-white font-semibold mb-3 rounded px-4 py-3 w-full text-[16px] shadow-md'>Create an account</button>


            <p className="text-sm text-[#545454] text-center">
              Already have an account?{" "}
              <Link to='/login' className="text-black hover:underline font-medium" href="#">
                Log in
              </Link>
            </p>
          </form>
        </div>

        <div>
          <div>
            <p className='text-[10px] leading-tight text-gray-600'>By proceeding, you consent to receiving calls, WhatsApp or SMS/RCS messages, including by automated means, from <span className='underline text-blue-500'>Uber</span>  and its affiliates to the number provided.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserSignup
