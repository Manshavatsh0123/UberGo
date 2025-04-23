import React, { useRef, useState } from 'react'
import { Link, useLocation } from "react-router-dom"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import 'remixicon/fonts/remixicon.css'
import FinishRide from "../Components/FinishRide";

const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const FinishRidePanelRef = useRef(null)
    const location = useLocation()
    const rideData = location.state?.ride

    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(FinishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(FinishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finishRidePanel])

    return (
        <div className='h-screen'>
            <div className='fixed p-5 top-0 flex items-center justify-between w-full'>
                <img className='w-16 drop-shadow-md' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="Uber Driver Icon" />
                <Link to='/CaptainHome' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full '>
                    <i className="ri-logout-box-r-line text-lg font-medium"></i>
                </Link>
            </div>


            <div className='h-4/5'>
                <img className='h-full w-full object-cover shadow-md shadow-gray-400/50' src="https://i2-prod.mylondon.news/article16106961.ece/ALTERNATES/s615/2_Uber-pink-cars.jpg" alt="" />
            </div>

            <div className="h-1/5 p-6 rounded-t-3xl shadow-[0_-4px_15px_rgba(0,0,0,0.1)] font-sans bg-gradient-to-b from-white to-gray-100 flex flex-col items-center justify-center relative" onClick={() => {
                setFinishRidePanel(true)
            }}>

                <h5 className="p-2 text-center w-[93%] absolute top-0 mb-4" onClick={() => props.setRidePopupPanel(false)}>
                    <i className="ri-arrow-down-wide-line text-3xl text-gray-800 transform rotate-180"></i>
                </h5>

                <div className="flex items-center space-x-2 mt-6 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v20M5 9l7 7 7-7"></path>
                    </svg>
                    <h4 className="text-2xl font-bold text-gray-900">4 KM away</h4>
                </div>

                <button className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
                    <span>Complete ride</span>
                </button>

                <div ref={FinishRidePanelRef} className=" bg-white translate-y-full  fixed bottom-0 left-0 right-0 px-4 py-6 pt-12 z-50 rounded-t-3xl shadow-[0_-4px_15px_rgba(0,0,0,0.1)] font-sans">
                    <FinishRide
                        ride={rideData}
                        setFinishRidePanel={setFinishRidePanel} />
                </div>

            </div>



        </div>
    )
}

export default CaptainRiding
