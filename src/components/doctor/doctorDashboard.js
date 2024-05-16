import React from 'react'
import LogOut from '../../pages/logOut'

const DoctorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-end">
        <LogOut />
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Doctor Dashboard</h2>
          <p className="mt-2 text-sm text-gray-500">Welcome back, Dr. Smith</p>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Your dashboard items here */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Appointments</h3>
                <p className="mt-1 text-sm text-gray-500">Manage your appointments</p>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Patients</h3>
                <p className="mt-1 text-sm text-gray-500">View and manage patient information</p>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Reports</h3>
                <p className="mt-1 text-sm text-gray-500">Generate and view reports</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard
