import React from 'react'

const Index = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Patient Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Profile Info */}
          <div className="bg-gray-200 p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
            <p>
              <span className="font-semibold">Name:</span> John Doe
            </p>
            <p>
              <span className="font-semibold">Age:</span> 35
            </p>
            <p>
              <span className="font-semibold">Gender:</span> Male
            </p>
          </div>
          {/* Edit Profile */}
          <div className="bg-gray-200 p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">Edit Profile</h3>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2" htmlFor="age">
                  Age
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="age"
                  type="text"
                  placeholder="Age"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2" htmlFor="gender">
                  Gender
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="gender">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
