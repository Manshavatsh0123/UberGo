import React, { useContext } from 'react';
import { CaptainDataContext } from '../context/Captaincontext';

const CaptainDetails = () => {
  const { captain, isLoading, error } = useContext(CaptainDataContext);

  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  
  if (error) {
    return <div>Error: {error}</div>;
  }

  
  if (!captain || !captain.fullname) {
    return <div>No captain data available.</div>;
  }

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-start gap-4'>
          <img className='h-12 w-12 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAp3Z1hXfTVTKtbw3vE75-rtfr1ZCFcPSw4A&s" alt="Captain" />
          <h4 className='text-lg font-medium text-gray-900 font-sans capitalize'>
            {captain.fullname.firstname} {captain.fullname.lastname}
          </h4>
        </div>
        <div className="text-right">
          <h4 className='text-2xl font-bold text-black'>₹293.20</h4>
          <p className='text-xs text-gray-500'>Earned</p>
        </div>
      </div>

      <div className='flex justify-between mt-8 bg-gray-100 rounded-xl px-4 py-5 gap-3'>
        <div className='text-center flex-1'>
          <i className="ri-history-line text-2xl text-black/60 mb-1 block"></i>
          <h5 className='text-lg font-semibold text-gray-800'>10.5</h5>
          <p className='text-xs text-gray-500'>Active Hours</p>
        </div>
        <div className='text-center flex-1'>
          <i className="ri-speed-up-fill text-2xl text-black/60 mb-1 block"></i>
          <h5 className='text-lg font-semibold text-gray-800'>10.2</h5>
          <p className='text-xs text-gray-500'>Idle Hours</p>
        </div>
        <div className='text-center flex-1'>
          <i className="ri-booklet-line text-2xl text-black/60 mb-1 block"></i>
          <h5 className='text-lg font-semibold text-gray-800'>10.2</h5>
          <p className='text-xs text-gray-500'>Total Hours</p>
        </div>
      </div>
    </div>
  );
}

export default CaptainDetails;
