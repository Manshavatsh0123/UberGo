import React from 'react'
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8  flex justify-between flex-col w-full '>

        <img className='w-16 ml-8 drop-shadow-2xl shadow-black/50' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />

        <div className='bg-white pb-7 py-4 px-4 rounded-t-2xl shadow-2xl shadow-black/30 border-t border-gray-200'>
          <h1 className='text-3xl font-bold text-center text-gray-800'>Get Started with Uber</h1>

          <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5 shadow-lg hover:shadow-2xl hover:bg-gray-900 transition-all duration-300 ease-in-out transform hover:scale-105'>Continue →</Link>
        </div>
      </div>
    </div>
  )
}

export default Start
