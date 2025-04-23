import React, { useState } from 'react';
import { Link } from "react-router-dom"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';



const ConfirmRidePopup = (props) => {

    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (isLoading) return;
        setIsLoading(true);
    
        try {
            const rideId = props.ride?._id;
            const token = localStorage.getItem('token');
            const captainId = props.captainId || localStorage.getItem('captainId');
    
            if (!rideId) {
                toast.error("Ride ID is missing.");
                return;
            }
    
            if (!otp || otp.length !== 6) {
                toast.error("Please enter a valid 6-digit OTP.");
                return;
            }
    
            if (!token) {
                toast.error("Please log in again.");
                return;
            }
    
            if (!captainId) {
                toast.error("Captain information is missing.");
                return;
            }
    
            const url = `${import.meta.env.VITE_BASE_URL}/rides/start-ride`;
            const payload = { rideId, otp, captainId };
    
            console.log("Sending payload:", payload);
    
            const response = await axios.post(url, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            console.log("Ride started:", response.data);
            toast.success("Ride has started!");
    
            // Reset UI and navigate
            localStorage.removeItem('captainId');
            props.setConfirmRidePopupPanel(false);
            props.setRidePopupPanel(false);
            navigate('/captainriding', { state: { ride: props.ride } });
    
        } catch (error) {
            console.error("Error response:", error.response);
            const msg = error?.response?.data?.message || error.message || "Failed to start the ride";
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };
    
    
    
    





    return (
        <div>
            <h5 className='p-2 text-center w-[93%] absolute top-0' onClick={() => {
                props.setRidePopupPanel(false);
            }}>
                <i className="ri-arrow-down-wide-line text-3xl text-gray-200"></i>
            </h5>

            <h3 className='text-[26px] font-semibold text-black tracking-tight leading-tight mb-2'>
                Confirm Your Pickup
            </h3>

            <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg mt-2 shadow-lg shadow-gray-400/50'>
                <div className='flex items-center gap-3'>
                    <img className='h-14 w-14 object-cover rounded-full shadow-md shadow-gray-400/50'
                        src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
                        alt="Passenger Profile"
                    />
                    <div>
                        <h4 className='text-lg font-medium text-gray-900'>{props.ride?.user?.fullname?.firstname + " " + props.ride?.user?.fullname?.lastname || 'Harsh Patel'}</h4>
                        <p className='text-sm text-gray-600'>Rating: {props.passengerRating || '4.5'}</p>
                    </div>
                </div>
                <h5 className='text-sm font-semibold text-gray-500'>{props.distance || '2.2 KM'}</h5>
            </div>

            <div className="w-full mt-3">

                <div className="flex items-center gap-5 p-3 border-b-2 border-b-gray-200">
                    <i className="ri-car-line text-lg text-gray-600"></i>
                    <div>
                        <h3 className="text-lg font-medium text-gray-800">Drop Location</h3>
                        <p className="text-sm text-gray-500">{props.ride?.destination || 'Default Destination'}</p>
                    </div>
                </div>


                <div className="flex items-center gap-5 p-3 border-b-2 border-b-gray-200">
                    <i className="ri-time-line text-lg text-gray-600"></i>
                    <div>
                        <h3 className="text-lg font-medium text-gray-800">{props.eta || '3 mins'}</h3>
                        <p className="text-sm text-gray-500">Estimated Pickup Time</p>
                    </div>
                </div>


                <div className="flex items-center gap-5 p-3">
                    <i className="ri-contacts-book-line text-lg text-gray-600"></i>
                    <div>
                        <h3 className="text-lg font-medium text-gray-800">Contact Passenger</h3>
                        <p className="text-sm text-gray-500">Tap to call or message</p>
                    </div>
                </div>


                <div className="w-full mt-3">

                    <form
                        className="w-full mt-3"
                        onSubmit={submitHandler}
                    >
                        <div className="flex items-center gap-5 p-3 border-b-2 border-b-gray-200 mt-4">
                            <div className="w-full">
                                <h3 className="text-lg font-medium text-gray-800">Enter OTP</h3>
                                <input
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    type="text"
                                    maxLength="6"
                                    placeholder="Enter OTP"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center bg-black active:bg-[#1c1c1c] text-white text-base font-semibold py-3 rounded-xl shadow-md active:shadow-sm transition duration-200 hover:bg-gray-800"
                        >
                            Confirm Pickup
                        </button>
                    </form>



                    <button
                        onClick={() => {
                            props.setConfirmRidePopupPanel(false);
                            props.setRidePopupPanel(false);
                        }}
                        className="w-full mt-3 bg-white border border-gray-300 active:bg-gray-200 text-gray-700 text-base font-medium py-3 rounded-xl shadow-sm active:shadow-inner transition duration-200 hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                </div>
            </div>

        </div>


    )
}

export default ConfirmRidePopup
