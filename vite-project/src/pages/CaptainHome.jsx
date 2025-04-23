import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import CaptainDetails from "../Components/CaptainDetails";
import RidePopup from "../Components/RidePopup";
import ConfirmRidePopup from "../Components/ConfirmRidePopup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css';
import { CaptainDataContext } from '../context/Captaincontext';
import { useSocket } from "../context/SocketContext";
import axios from "axios";
import { toast } from 'react-toastify';

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const RidePopupPanelRef = useRef(null);
  const [confirmridePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const ConfirmRidePopupPanelRef = useRef(null);
  const [ride, setRide] = useState(null);

  const socket = useSocket();
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    if (!captain) return;

    socket.emit("join", { userType: "captain", userId: captain._id });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    return () => clearInterval(locationInterval);
  }, [socket, captain]);


  useEffect(() => {
    if (!captain) return;

    socket.emit("join", { userType: "captain", userId: captain._id });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    return () => clearInterval(locationInterval);
  }, [socket, captain]);


  useEffect(() => {

    if (socket) {
      socket.on('new-ride', (data) => {
        console.log(data);
        setRide(data);
        setRidePopupPanel(true);
      });


      return () => {
        socket.off('new-ride');
      };
    } else {
      console.log('Socket is not initialized yet.');
    }
  }, [socket]);




  useGSAP(() => {
    gsap.to(RidePopupPanelRef.current, {
      transform: ridePopupPanel ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.3,
      ease: "power2.out"
    });
  }, [ridePopupPanel]);


  useGSAP(() => {
    gsap.to(ConfirmRidePopupPanelRef.current, {
      transform: confirmridePopupPanel ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.3,
      ease: "power2.out"
    });
  }, [confirmridePopupPanel]);



  async function confirmRide() {
    try {
      if (!ride || !ride._id) {
        console.error("Error: Ride or Ride ID is missing.");
        toast.error("Ride ID is missing");
        return;
      }

      if (!captain) {
        console.error("Error: Captain data is missing.");
        toast.error("Captain data is missing");
        return;
      }

      const url = `${import.meta.env.VITE_BASE_URL}/rides/confirm`;

      const payload = {
        rideId: ride._id,
        captainId: captain._id,
      };

      console.log("Sending payload:", payload);

      // Check if socket is connected before emitting
      if (socket && socket.connected) {
        socket.emit('ride-confirmed', {
          rideId: ride._id,
          captainId: captain._id,
        });
        console.log('ride-confirmed event emitted to server');
        toast.success("Ride confirmed successfully");
      } else {
        console.warn('Socket is not connected. Cannot emit ride-confirmed');
        toast.error("Socket is not connected. Please try again later");
        return;
      }

      // Listen for confirmation response
      socket.on('ride-confirmation-success', (response) => {
        console.log(response.message);
        setRidePopupPanel(false);
        setConfirmRidePopupPanel(true);
      });

      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      console.log("Ride confirmed:", response.data);

    } catch (error) {
      console.error("Error confirming ride:", error.response?.data || error.message);
      toast.error("Something went wrong while confirming the ride");
    }
  }






  return (
    <div className='h-screen'>

      <div className='fixed p-5 top-0 flex items-center justify-between w-full'>
        <img className='w-16 drop-shadow-md' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="Uber Driver Icon" />
        <Link to='/captainlogin' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="ri-logout-box-r-line text-lg font-medium"></i>
        </Link>
      </div>


      <div className='h-3/5'>
        <img
          className='h-full w-full object-cover shadow-md shadow-gray-400/50'
          src="https://user-images.githubusercontent.com/6416095/52931260-c6bb5e80-3371-11e9-9d46-83f7d1389d18.gif"
          alt="Uber Cab"
        />
      </div>


      <div
        className='h-2/5 p-6 bg-white rounded-t-3xl shadow-[0_-4px_15px_rgba(0,0,0,0.1)] font-sans'
        onClick={() => setRidePopupPanel(true)}
      >
        <CaptainDetails />
      </div>


      <div
        ref={RidePopupPanelRef}
        className="bg-white translate-y-full fixed bottom-0 left-0 right-0 px-4 py-6 pt-12 z-50 rounded-t-3xl shadow-[0_-4px_15px_rgba(0,0,0,0.1)] font-sans"
      >
        <RidePopup
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>


      <div
        ref={ConfirmRidePopupPanelRef}
        className="bg-white translate-y-full h-screen fixed bottom-0 left-0 right-0 px-4 py-6 pt-12 z-50 rounded-t-3xl shadow-[0_-4px_15px_rgba(0,0,0,0.1)] font-sans"
      >
        <ConfirmRidePopup
          ride={ride}
          captainId={captain?._id || localStorage.getItem('captainId')}
          confirmRide={confirmRide}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
