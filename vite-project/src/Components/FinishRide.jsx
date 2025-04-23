import React from 'react'
import { Link } from "react-router-dom"


const FinishRide = (props) => {
    return (
        <div className="relative p-4 pt-8 pb-6 bg-white min-h-screen flex flex-col justify-between">

            <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full shadow">
                <i className="ri-check-line text-3xl text-green-600"></i>
            </div>


            <div>
                <h3 className="text-[26px] font-semibold text-center text-black mb-4">
                    Drop-off Completed 🎉
                </h3>

                <div className='flex items-center justify-center flex-col bg-green-50 rounded-xl p-4 shadow-md shadow-gray-300 mb-4'>
                    <img className='h-16 w-16 object-cover rounded-full mb-2 shadow'
                        src={props.passengerImg || "https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000"}
                        alt="Passenger"
                    />
                    <h4 className='text-lg font-medium text-gray-900'>{props.ride?.user?.fullname?.firstname + " " + props.ride?.user?.fullname?.lastname || 'Harsh Patel'}</h4>
                    <p className='text-sm text-gray-600'>Rating: {props.passengerRating || '4.5'}</p>
                </div>

                <div className="space-y-3 border-t pt-3">
                    <div className="flex items-center gap-4">
                        <i className="ri-car-line text-xl text-gray-600"></i>
                        <div>
                            <p className="text-sm text-gray-500">Drop Location</p>
                            <p className="text-base font-medium text-gray-800">{props.ride?.destination || 'Default Destination'}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <i className="ri-time-line text-xl text-gray-600"></i>
                        <div>
                            <p className="text-sm text-gray-500">Cash</p>
                            <p className="text-base font-medium text-gray-800">₹{props.ride?.fare || '0'}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <i className="ri-map-pin-line text-xl text-gray-600"></i>
                        <div>
                            <p className="text-sm text-gray-500">Pickup Location</p>
                            <p className="text-base font-medium text-gray-800">{props.ride?.origin || 'Default Origin'}</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="mt-6">
                <Link
                    to="/captainhome"
                    className="w-full block text-center bg-black active:bg-[#1c1c1c] text-white text-base font-semibold py-3 rounded-xl shadow-md active:shadow-sm transition duration-200 hover:bg-gray-800"
                >
                    Complete Ride & Return to Home
                </Link>

                <p className="mt-2 text-center text-sm text-gray-500 px-4">
                    Please click the button above only after dropping off the passenger at their destination.
                </p>
            </div>
        </div>

    )
}

export default FinishRide
