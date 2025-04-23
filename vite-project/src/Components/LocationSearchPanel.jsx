import React from 'react'

const LocationSearchPanel = ({
  suggestions,
  setVehiclePanelOpen,
  setPanelOpen,
  setPickup,
  setDestination,
  activeField
}) => {

  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion)
    } else if (activeField === 'destination') {
      setDestination(suggestion)
    }
    //setPanelOpen(false)
    //setVehiclePanelOpen(true)
  }

  return (
    <div className="px-4 pb-6">
      {suggestions.map((elem, idx) => (
        <div
          key={idx}
          onClick={() => handleSuggestionClick(elem)}
          className="flex items-start gap-3 p-4 mb-3 bg-white rounded-xl shadow-sm hover:shadow-md active:bg-gray-100 transition-all cursor-pointer"
        >
          <div className="h-10 w-10 flex items-center justify-center bg-gray-200 rounded-full">
            <i className="ri-map-pin-2-fill text-gray-700 text-lg"></i>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-semibold text-gray-900 leading-snug truncate">
              {elem.display_name?.split(',')[0]}
            </p>
            <p className="text-sm text-gray-500 leading-snug truncate">
              {elem.display_name?.split(',').slice(1).join(', ')}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LocationSearchPanel
