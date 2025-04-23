import React, { useRef, useState, useContext, useEffect } from 'react'
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../Components/LocationSearchPanel"
import VehiclePanel from "../Components/VehiclePanel"
import ConfirmeRide from "../Components/ConfirmeRide"
import WaitingForDriver from "../Components/WaitingForDriver"
import LookingForDriver from "../Components/LookingForDriver"
import axios from "axios";
import { SocketContext, useSocket } from "../context/SocketContext";
import { UserDataContext } from "../context/Usercontext"
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelClosedRef = useRef(null)
  const vehiclepanelRef = useRef(null)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
  const ConfirmeRidePanelRef = useRef(null)
  const [confirmeRidePanel, setConfirmeRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const vehicleFoundRef = useRef(null)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const WaitingForDriverRef = useRef(null)
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [activeField, setActiveField] = useState('pickup');
  const [buttonText, setButtonText] = useState('Find Trip');
  const [fare, setFare] = useState(null);
  const [loading, setLoading] = useState(false);
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide] = useState(null)
  const [otp, setOtp] = useState(null)
  const [error, setError] = useState("")


  const socket = useSocket()
  const { user } = useContext(UserDataContext)
  const navigate = useNavigate()


  useEffect(() => {
    if (!socket?.connected || !user?._id) return;
    socket.emit("join", { userType: "user", userId: user._id });
  }, [socket?.connected, user?._id]);

  useEffect(() => {
    if (!socket) return;
    console.log('✅ ride-confirmed listener mounted');

    socket.on('ride-confirmed', (rideData) => {
      console.log('🎉 ride-confirmed event received');
      console.log('Full rideData:', rideData);

      // Continue with your logic
      setVehicleFound(true);
      setWaitingForDriver(false);
      setRide(rideData);
    });

    return () => {
      console.log('Cleanup ride-confirmed listener');
      socket.off('ride-confirmed');
    };
  }, [socket]); 

  useEffect(() => {
    if (!socket) return;
    console.log('✅ ride-started listener mounted');
  
    const handleRideStarted = (ride) => {
      console.log('🎉 ride-started event received');
      console.log('Full ride:', ride);
  
      setWaitingForDriver(false);
      navigate('/riding', { state: { ride: { test: true } } });
    };
  
    socket.on('ride-started', handleRideStarted);
  
    return () => {
      console.log('🧹 Cleanup ride-started listener');
      socket.off('ride-started', handleRideStarted);
    };
  }, [socket, navigate]);
  

  

  const handlePickupChange = async (e) => {
    const value = e.target.value
    setPickup(value)

    if (value.length < 3) {
      setPickupSuggestions([])
      return
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/autocomplete`, {
        params: { input: value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setPickupSuggestions(response.data)
    } catch {
      setPickupSuggestions([])
    }
  }


  const handleDestinationChange = async (e) => {
    const inputValue = e.target.value;
    setDestination(inputValue);


    if (inputValue.length < 3) return;

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/autocomplete`, {
        params: { input: inputValue },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });


      if (Array.isArray(response.data)) {
        setDestinationSuggestions(response.data);
      } else {
        setDestinationSuggestions([]);
      }

    } catch (error) {
      console.error("Failed to fetch destination suggestions:", error.message);
      setDestinationSuggestions([]);
    }
  }


  const submitHandler = (e) => {
    e.preventDefault()
  }

  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24,
        opacity: 1
      })
      gsap.to(panelClosedRef.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0,
        opacity: 0
      })
      gsap.to(panelClosedRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen])

  useGSAP(function () {
    if (vehiclePanelOpen) {
      gsap.to(vehiclepanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehiclepanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanelOpen])

  useGSAP(function () {
    if (confirmeRidePanel) {
      gsap.to(ConfirmeRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(ConfirmeRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmeRidePanel])

  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(WaitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(WaitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [waitingForDriver])

  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicleFound])



  async function findTrip() {
    if (!pickup || !destination) {
      alert("Please select both pickup and destination.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { origin: pickup?.display_name || pickup, destination: destination?.display_name || destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log("Fare response:", response.data);

      setFare(response.data);
      setVehiclePanelOpen(true);
      setPanelOpen(false);
    } catch (error) {
      console.error("Error fetching fare:", error);
      alert("Failed to calculate fare. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function createRide() {
    try {
      const url = `${import.meta.env.VITE_BASE_URL}/rides/create`;
      //console.log("Requesting to:", url);

      const payload = {
        origin: pickup?.display_name || pickup,
        destination: destination?.display_name || destination,
        fare: fare?.[vehicleType] || fare?.fare || fare,
        vehicleType: vehicleType
      };

      console.log("Payload:", payload);

      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      console.log("Ride created:", response.data);

      const rideData = response.data;


      setOtp(rideData.otp); 
      setRide(rideData);
    } catch (error) {
      console.error("Failed to create ride:", error.response?.data?.errors || error.response?.data || error.message);
    }
  }




  return (
    <div className='h-screen overflow-hidden relative'>
      <img className='w-16 absolute left-5 top-5 drop-shadow-md' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />

      <div className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src="https://user-images.githubusercontent.com/6416095/52931260-c6bb5e80-3371-11e9-9d46-83f7d1389d18.gif" alt="" />
      </div>

      <div className='flex flex-col justify-end absolute h-screen top-0 w-full '>
        <div className='h-[36%] relative bg-white pb-7 py-4 px-4 rounded-t-2xl shadow-lg shadow-black/10border-t border-gray-200'>
          <h5 ref={panelClosedRef} onClick={() => {
            setPanelOpen(false)
          }} className='absolute opacity-0 right-6 top-6 text-2xl'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-[28px] font-bold text-black tracking-tight leading-snug mb-3'>Where to?</h4>
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>

            <div className="absolute left-6 top-[calc(50%-20px)] flex flex-col items-center">
              <div className="w-3 h-3 bg-black rounded-full mb-1"></div>
              <div className="w-[2px] h-10 bg-gray-400"></div>
              <div className="w-[10px] h-[10px] bg-black rotate-45 mt-1"></div>
            </div>

            <div className="relative mb-3">
              <i className="ri-map-pin-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
              <input
                type="text"
                placeholder="Enter pickup location"
                onClick={() => {
                  setPanelOpen(true)
                  setActiveField('pickup')
                }}
                value={pickup?.display_name || pickup}
                onChange={handlePickupChange}
                className="pl-12 pr-4 py-3 w-full bg-gray-100 rounded-lg text-base text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="relative mb-1">
              <i className="ri-navigation-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
              <input
                type="text"
                placeholder="Enter destination"
                onClick={() => {
                  setPanelOpen(true)
                  setActiveField('destination')
                }}
                value={destination?.display_name || destination}
                onChange={handleDestinationChange}
                className="pl-12 pr-4 py-3 w-full bg-gray-100 rounded-lg text-base text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </form>

          <button
            onClick={findTrip}
            className="bg-black text-white px-8 py-2 rounded-full mt-3 w-full text-lg font-semibold transform transition-all duration-200 ease-in-out hover:bg-gray-900 active:bg-gray-800 shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            disabled={loading}
          >
            {loading ? "Calculating..." : buttonText}
          </button>


        </div>

        <div ref={panelRef} className=' bg-white opacity-0 h-0 overflow-hidden'>
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
            setWaitingForDriver={setWaitingForDriver}
          />

        </div>

      </div>

      <div ref={vehiclepanelRef} className=" bg-white translate-y-full fixed bottom-0 left-0 right-0 px-4 py-10 pt-12 z-50">
        <VehiclePanel
          selectVehicle={(type) => {
            setVehicleType(type);
            setConfirmeRidePanel(true);
            setVehiclePanelOpen(false);
          }}
          fare={fare}
          setConfirmeRidePanel={setConfirmeRidePanel}
          setVehiclePanelOpen={setVehiclePanelOpen} />
      </div>

      <div ref={ConfirmeRidePanelRef} className=" bg-white translate-y-full fixed bottom-0 left-0 right-0 px-4 py-6 pt-12 z-50">
        <ConfirmeRide
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmeRidePanel={setConfirmeRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      <div ref={vehicleFoundRef} className=" bg-white translate-y-full fixed bottom-0 left-0 right-0 px-4 py-6 pt-12 z-50">
        <LookingForDriver
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setVehicleFound={setVehicleFound}
          otp={otp}  />
      </div>

      <div ref={WaitingForDriverRef} className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full">
        <WaitingForDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          waitingForDriver={waitingForDriver}
        />
      </div>

    </div>
  )
}

export default Home
