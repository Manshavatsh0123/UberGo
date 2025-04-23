import React from 'react'
import { Link } from "react-router-dom";

const Riding = (props) => {
    socket.on("ride-ended", () => {
        navigate('/home')
    })


    return (
        <div className='h-screen'>
            <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full '>
                <i className="ri-home-4-line text-lg font-medium"></i>
            </Link>
            <div className='h-1/2'>
                <img className='h-full w-full object-cover' src="https://i2-prod.mylondon.news/article16106961.ece/ALTERNATES/s615/2_Uber-pink-cars.jpg" alt="" />
            </div>
            <div className='h-1/2 p-4 bg-white rounded-t-3xl shadow-[0_-4px_15px_rgba(0,0,0,0.1)]'>

                <div className='flex items-center justify-between'>
                    <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1682350473/assets/97/e2a99c-c349-484f-b6b0-3cea1a8331b5/original/UberBlack.png" alt="Uber Black" />
                    <div className='text-right'>
                        <h2 className='text-base font-medium'>{ride?.captain.fullname.firstname}</h2>
                        <h4 className='text-lg font-semibold'>{ride?.captain.vehicle.plate}</h4>
                        <p className='text-sm text-gray-600'>Mautri Suzuki Alto</p>
                    </div>
                </div>

                <div className='flex gap-2 justify-between flex-col items-center'>

                    <div className='w-full mt-5'>
                        <div className='flex items-center gap-5 p-3 border-b-2 border-b-gray-200'>
                            <i className="ri-map-pin-fill text-lg"></i>
                            <div>
                                <h3 className='text-base font-medium'>56/11-B </h3>
                                <p className='text-sm -m-1 text-gray-600'>{props.pickup.display_name}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-3 '>
                            <i className="ri-currency-line text-lg"></i>
                            <div>
                                <h3 className='text-lg font-medium'>₹{props.fare && props.vehicleType ? props.fare[props.vehicleType] : "N/A"}</h3>
                                <p className='text-sm  text-gray-600'>Cash</p>
                            </div>
                        </div>
                    </div>

                </div>

                <button className='w-full mt-6 bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition'>Payment</button>
            </div>
        </div>
    )
}

export default Riding
