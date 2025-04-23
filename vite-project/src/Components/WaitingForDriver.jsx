import React from 'react';

const WaitingForDriver = (props) => {
  const { ride } = props;
  const captain = ride?.captain || {};

  const captainFullName = captain?.fullname ? `${captain.fullname.firstname} ${captain.fullname.lastname}` : 'Driver Name';
  const vehicleColor = captain?.vehicle?.color || 'Vehicle Color';
  const vehiclePlate = captain?.vehicle?.plate || 'Vehicle Plate';
  const vehicleModel = captain?.vehicle?.vehicleType || 'Vehicle Model'; 

  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
        props.setWaitingForDriver(false);
      }}>
        <i className="ri-arrow-down-wide-line text-3xl text-gray-200"></i>
      </h5>
      
      <div className='flex items-center justify-between'>
        <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1682350473/assets/97/e2a99c-c349-484f-b6b0-3cea1a8331b5/original/UberBlack.png" alt="Vehicle" />
        <div className='text-right'>
          <h2 className='text-lg font-medium'>{captainFullName}</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>{vehiclePlate}</h4>
          <p className='text-sm text-gray-600'>{vehicleModel}</p>
        </div>
      </div>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2 border-b-gray-200'>
            <i className="ri-map-pin-2-fill text-lg"></i>
            <div>
              <h3 className='text-lg font-medium'>{ride?.origin?.address || 'Pickup Address'}</h3>
              <p className='text-sm -m-1 text-gray-600'>{ride?.origin?.city || ''}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2 border-b-gray-200'>
            <i className="ri-map-pin-fill text-lg"></i>
            <div>
              <h3 className='text-lg font-medium'>{ride?.destination?.address || 'Drop Address'}</h3>
              <p className='text-sm -m-1 text-gray-600'>{ride?.destination?.city || ''}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className="ri-currency-line text-lg"></i>
            <div>
              <h3 className='text-lg font-medium'>₹{ride?.fare?.toFixed(2) || '0.00'}</h3>
              <p className='text-sm -m-1 text-gray-600'>{ride?.paymentMode || 'Cash'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
