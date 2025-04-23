import React, { useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/Captaincontext.jsx";
import axios from "axios";

const CaptainSignup = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')


  const { captain, setCaptain } = React.useContext(CaptainDataContext)


  const submitHandler = async (e) => {
    e.preventDefault()
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captions/register`, captainData)

    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/CaptainHome')
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')

  }

  return (
    <div>
      <div className='p-7 h-screen flex flex-col justify-between bg-white font-sans'>
        <div>

          <img className='w-20 mb-2 drop-shadow-md' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>

            <h3 className='text-[17px] font-semibold mb-2 text-[#111]'>What's the name of our caption?</h3>
            <div className='flex gap-4 mb-4'>
              <input
                type="text"
                name="firstname"
                autoComplete="given-name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className='bg-[#f6f6f6] rounded px-4 py-3 border border-gray-300 w-1/2 text-[15px] placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-black'
                placeholder='Firstname'
              />

              <input
                type="text"
                name="lastname"
                autoComplete="family-name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className='bg-[#f6f6f6] rounded px-4 py-3 border border-gray-300 w-1/2 text-[15px] placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-black'
                placeholder='Lastname'
              />
            </div>

            <h3 className='text-[17px] font-semibold mb-2 text-[#111]'>What's our Captain's email?</h3>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className='bg-[#f6f6f6] mb-4 rounded px-4 py-3 border border-gray-300 w-full text-[15px] placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-black'
              placeholder='email@example.com' />

            <h3 className='text-[17px] font-semibold mb-2 text-[#111]'>Enter Password</h3>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              className='bg-[#f6f6f6] mb-4 rounded px-4 py-3 border border-gray-300 w-full text-[15px] placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-black'
              placeholder='Password ' />

            {/*Vehical information */}
            <h3 className='text-[17px] font-semibold mb-4 text-[#111]'>Vehicle Information</h3>
            <div className='flex gap-4 mb-4'>
              <input
                required
                className='bg-[#f6f6f6] w-1/2 rounded px-4 py-3 border border-gray-300 text-[15px] placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-black'
                type="text"
                placeholder='Vehicle Color'
                value={vehicleColor}
                onChange={(e) => {
                  setVehicleColor(e.target.value)
                }}
              />
              <input
                required
                className='bg-[#f6f6f6] w-1/2 rounded px-4 py-3 border border-gray-300 text-[15px] placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-black'
                type="text"
                placeholder='Vehicle Plate'
                value={vehiclePlate}
                onChange={(e) => {
                  setVehiclePlate(e.target.value)
                }}
              />
            </div>
            <div className='flex gap-4 mb-4'>
              <input
                required
                className='bg-[#f6f6f6] w-1/2 rounded px-4 py-3 border border-gray-300 text-[15px] placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-black'
                type="number"
                placeholder='Vehicle Capacity'
                value={vehicleCapacity}
                onChange={(e) => {
                  setVehicleCapacity(e.target.value)
                }}
              />
              <select
                required
                className='bg-[#f6f6f6] w-1/2 rounded px-4 py-3 border border-gray-300 text-[15px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-black'
                value={vehicleType}
                onChange={(e) => {
                  setVehicleType(e.target.value)
                }}
              >
                <option value="" disabled>Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
              </select>
            </div>


            <button className='bg-[#000] hover:bg-[#111] transition-all duration-200 text-white font-semibold mb-3 rounded px-4 py-3 w-full text-[16px] shadow-md'>Create Captain Account</button>


            <p className="text-sm text-[#545454] text-center">
              Welcome back!{" "}
              <Link to='/captainlogin' className="text-black hover:underline font-medium" href="#">
                Forgot your password?
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CaptainSignup
