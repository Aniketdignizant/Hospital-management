import React from 'react'
import LogOut from '../../pages/logOut'

const AdminDashboard = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-end">
        <LogOut />
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/4 px-4">
            <div className="bg-gray-200 p-4 rounded mb-10 h-full">
              <h3 className="text-lg font-semibold mb-2">Navigation</h3>
              <ul>
                <li className="py-1">DoctorDashboard</li>
                <li className="py-1">Doctor index</li>
                <li className="py-1">Index</li>
                <li className="py-1">Patient Dashboard</li>
              </ul>
            </div>
          </div>

          <div className="w-full md:w-3/4 px-4">
            <div className="bg-gray-200 p-4 rounded mb-4">
              <h3 className="text-lg font-semibold mb-2">Upcoming Appointments</h3>
              <ul>
                <li className="py-1">Appointment 1</li>
                <li className="py-1">Appointment 2</li>
                <li className="py-1">Appointment 3</li>
              </ul>
            </div>
            <div className="bg-gray-200 p-4 rounded">
              <h3 className="text-lg font-semibold mb-2">Medical Records</h3>
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Doctor</th>
                    <th>Diagnosis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2024-05-17</td>
                    <td>Dr. Smith</td>
                    <td>Cold</td>
                  </tr>
                  <tr>
                    <td>2024-05-15</td>
                    <td>Dr. Johnson</td>
                    <td>Flu</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
