import React from 'react'
import { useNavigate } from 'react-router-dom'

const LookingForDriver = (props) => {
  const navigate = useNavigate()

  const handlePayment = () => {
    // any payment logic here
    navigate('/home')
  }
  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-0 ' onClick={() => {
        props.setVehicleFound(false)

      }}><i className="ri-arrow-down-wide-line text-3xl text-gray-200"></i></h5>
      <h3 className='text-[25px] font-bold text-black tracking-tight leading-snug mb-3'>Finding a driver for you...</h3>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <img className='h-20' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1682350473/assets/97/e2a99c-c349-484f-b6b0-3cea1a8331b5/original/UberBlack.png" alt="" />

        <div className='w-full mt-5 rounded-lg bg-white shadow-md overflow-hidden'>
          <div className='flex items-center gap-5 p-4 border-b border-gray-200 hover:bg-gray-50 transition-all duration-300 ease-in-out'>
            <i className="ri-map-pin-2-fill text-xl text-gray-600"></i>
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1">Pickup Location</p>
              <p className='text-sm text-gray-800 font-medium'>{props.pickup.display_name}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-4 border-b border-gray-200 hover:bg-gray-50 transition-all duration-300 ease-in-out'>
            <i className="ri-map-pin-fill text-xl text-gray-600"></i>
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1">Drop Location</p>
              <p className='text-sm text-gray-800 font-medium'>{props.destination.display_name}</p>
            </div>
          </div>


          <div className='flex items-center gap-5 p-4 border-b border-gray-200 hover:bg-gray-50 transition-all duration-300 ease-in-out'>
            <i className="ri-arrow-right-s-fill text-xl text-gray-600"></i>
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1">OTP:</p>
              <p className='text-sm text-gray-800 font-medium'>{props.otp}</p>
            </div>
          </div>



          <div className='flex items-center gap-5 p-4 border-b border-gray-200 hover:bg-gray-50 transition-all duration-300 ease-in-out ' >
            <i className="ri-currency-line text-xl text-gray-600"></i>
            <div>
              <h3 className='text-sm text-gray-800 font-medium'>₹{props.fare && props.vehicleType ? props.fare[props.vehicleType] : "N/A"}</h3>
              <p className='text-sm text-gray-600'>Cash</p>
            </div>
          </div>
        </div>
        <button
          className="w-full mt-6 bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition"
          onClick={handlePayment}
        >
          Payment
        </button>
      </div>
    </div>
  )
}

export default LookingForDriver
