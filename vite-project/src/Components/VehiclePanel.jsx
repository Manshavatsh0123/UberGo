import React from 'react'

const VehiclePanel = (props) => {
    return (
        <div>
            <h5
                className='p-1 text-center w-[93%] absolute top-0 cursor-pointer hover:text-black transition'
                onClick={() => props.setVehiclePanelOpen(false)}
            >
                <i className="ri-arrow-down-wide-line text-3xl text-gray-200"></i>
            </h5>

            <h3 className='text-[25px] font-bold text-black tracking-tight leading-snug mb-3'>Choose how you ride</h3>

            {/*First-car */}
            <div
                onClick={() => props.selectVehicle('car')} className="w-full bg-white mb-1 px-3 py-2 border border-transparent active:border-black rounded-xl shadow-md hover:shadow-lg transition cursor-pointer">
                <div className="flex items-center gap-3">
                    <img
                        src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1682350473/assets/97/e2a99c-c349-484f-b6b0-3cea1a8331b5/original/UberBlack.png"
                        alt="Uber Black"
                        className="w-16 h-14 object-contain"
                    />

                    <div className="flex justify-between items-start w-full">
                        <div className="flex flex-col leading-tight">
                            <div className="flex items-center gap-2">
                                <h4 className="text-sm font-semibold text-gray-900">UberGo</h4>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <i className="ri-user-3-fill text-xs" /> 4
                                </span>
                            </div>
                            <span className="text-xs text-gray-500">2 min away</span>
                            <span className="text-xs text-gray-500">Affordable, compact rides</span>
                        </div>

                        <h2 className="text-base font-semibold text-gray-900 mt-1">{props.fare?.car !== undefined ? `₹${props.fare.car}` : '₹--'}</h2>
                    </div>
                </div>
            </div>

            {/*second-moto */}
            <div onClick={() => props.selectVehicle('moto')} className="w-full bg-white mb-1 px-3 py-2 border border-transparent active:border-black rounded-xl shadow-md hover:shadow-lg transition cursor-pointer">
                <div className="flex items-center gap-3">
                    <img
                        src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
                        alt="Uber Black"
                        className="w-16 h-14 object-contain"
                    />

                    <div className="flex justify-between items-start w-full">
                        <div className="flex flex-col leading-tight">
                            <div className="flex items-center gap-2">
                                <h4 className="text-sm font-semibold text-gray-900">Moto</h4>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <i className="ri-user-3-fill text-xs" /> 1
                                </span>
                            </div>
                            <span className="text-xs text-gray-500">3 min away</span>
                            <span className="text-xs text-gray-500">Affordable motocycle rides</span>
                        </div>

                        <h2 className="text-base font-semibold text-gray-900 mt-1">{props.fare?.moto !== undefined ? `₹${props.fare.moto}` : '₹--'}
                        </h2>
                    </div>

                </div>
            </div>

            {/*Third-auto */}
            <div onClick={() => props.selectVehicle('auto')} className="w-full bg-white mb-1 px-3 py-2 border border-transparent active:border-black rounded-xl shadow-md hover:shadow-lg transition cursor-pointer">
                <div className="flex items-center gap-3">
                    <img
                        src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
                        alt="Uber Black"
                        className="w-16 h-14 object-contain"
                    />

                    <div className="flex justify-between items-start w-full">
                        <div className="flex flex-col leading-tight">
                            <div className="flex items-center gap-2">
                                <h4 className="text-sm font-semibold text-gray-900">UberAuto</h4>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <i className="ri-user-3-fill text-xs" /> 3
                                </span>
                            </div>
                            <span className="text-xs text-gray-500">6 min away</span>
                            <span className="text-xs text-gray-500">Affordable auto rides</span>
                        </div>

                        <h2 className="text-base font-semibold text-gray-900 mt-1">{props.fare?.auto !== undefined ? `₹${props.fare.auto}` : '₹--'}
                        </h2>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default VehiclePanel
