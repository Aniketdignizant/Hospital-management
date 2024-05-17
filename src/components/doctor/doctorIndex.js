import React from 'react'

const DoctorIndex = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Dr. John Doe</div>
          <div className="text-gray-700 text-base">Specialty: Cardiology</div>
          <div className="text-gray-700 text-base">Experience: 10+ years</div>
          <div className="text-gray-700 text-base">Location: New York</div>
        </div>
        <div className="px-6 py-4">
          <h2 className="font-bold text-lg mb-2">About Dr. John Doe</h2>
          <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus euismod dolor id mi
            cursus, vel laoreet sem ultricies. Donec at mollis lacus. Vestibulum nec erat nec velit
            posuere fermentum.
          </p>
        </div>
      </div>
    </div>
  )
}

export default DoctorIndex
