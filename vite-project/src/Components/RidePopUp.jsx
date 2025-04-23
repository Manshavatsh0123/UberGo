import React from 'react'

const RidePopup = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setRidePopupPanel(false)
            }}>
                <i className="ri-arrow-down-wide-line text-3xl text-gray-200"></i>
            </h5>

            <h3 className='text-[26px] font-semibold text-black tracking-tight leading-tight mb-3'>
                Confirm Pickup
            </h3>

            <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg mt-4 shadow-md shadow-gray-400/50'>
                <div className='flex items-center gap-3 '>
                    <img className='h-14 w-14 object-cover rounded-full shadow-md shadow-gray-400/50' src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww" alt="" />
                    <h4 className='text-lg font-medium text-gray-900'>{props.ride?.user?.fullname?.firstname + " " + props.ride?.user?.fullname?.lastname || 'Harsh Patel'}</h4>
                </div>
                <h5 className='text-sm font-semibold text-gray-500'>{props.distance || '2.2 KM'}</h5>
            </div>

            <div className='flex gap-2 justify-between flex-col items-center'>


                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-b-gray-200'>
                        <i className="ri-map-pin-2-fill text-lg text-gray-600"></i>
                        <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1">Pickup Location</p>
                            <p className='text-sm -m-1 text-gray-600'>{props.ride?.origin || 'Default Origin'}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3 border-b-2 border-b-gray-200'>
                        <i className="ri-map-pin-fill text-lg text-gray-600"></i>
                        <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1">Drop Location</p>
                            <p className='text-sm -m-1 text-gray-600'>{props.ride?.destination || 'Default Destination'}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line text-lg text-gray-600"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare || '0'}</h3>
                            <p className='text-sm -m-1 text-gray-600'>Cash</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => {
                        props.setConfirmRidePopupPanel(true)
                        props.confirmRide()
                    }}
                    className='w-full mt-5 bg-black active:bg-[#1c1c1c] text-white text-base font-semibold py-3 rounded-xl shadow-md active:shadow-sm transition duration-100'
                >
                    Accept
                </button>
                <button
                    onClick={() => {
                        props.setRidePopupPanel(false)
                    }}
                    className='w-full mt-2 bg-white border border-gray-300 active:bg-gray-200 text-gray-700 text-base font-medium py-3 rounded-xl shadow-sm active:shadow-inner transition duration-100'
                >
                    Ignore
                </button>
            </div>
        </div>
    )
}

export default RidePopup
