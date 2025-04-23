import React from 'react';

const ConfirmRide = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
        props.setConfirmeRidePanel(false);
      }}>
        <i className="ri-arrow-down-wide-line text-3xl text-gray-200"></i>
      </h5>

      <h3 className='text-[25px] font-bold text-black tracking-tight leading-snug mb-3'>
        Review and confirm your trip
      </h3>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <img className='h-20' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1682350473/assets/97/e2a99c-c349-484f-b6b0-3cea1a8331b5/original/UberBlack.png" alt="Uber Black" />

        <div className='w-full mt-5 space-y-4'>
          <div className='flex items-center gap-5 p-3 border-b-2 border-b-gray-200'>
            <i className="ri-map-pin-2-fill text-lg"></i>
            <div>
            <p className="text-xs font-semibold text-gray-500 mb-1">Pickup Location</p>
              <p className='text-lg -m-1 '>{props.pickup.display_name}</p>
            </div>
          </div>

          <div className='flex items-center gap-5 p-3 border-b-2 border-b-gray-200'>
            <i className="ri-map-pin-fill text-lg"></i>
            <div>
            <p className="text-xs font-semibold text-gray-500 mb-1">Drop Location</p>
              <p className='text-lg -m-1'>{props.destination.display_name}</p>
            </div>
          </div>
          

          <div className='flex items-center gap-5 p-3'>
            <i className="ri-currency-line text-lg"></i>
            <div>
              <h3 className='text-lg font-medium'>₹{props.fare && props.vehicleType ? props.fare[props.vehicleType] : "N/A"}</h3>
              <p className='text-sm -m-1 text-gray-600'>Cash</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            props.setVehicleFound(true);
            props.setConfirmeRidePanel(false);
            props.createRide()
          }}
          className='w-full mt-5 bg-green-700 text-white font-semibold p-2 rounded-lg'
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
