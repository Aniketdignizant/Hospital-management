import React, { useState } from 'react'
import { useCookies } from 'react-cookie'

const LogOut = () => {
  const [showModal, setShowModal] = useState(false)
  const [, , removeCookie] = useCookies(['user'])

  const handleLogOut = () => {
    setShowModal(true)
    document.cookie = `userId=${''}`
    localStorage.removeItem('userData')
  }

  const handleConfirmLogout = () => {
    console.log('Logging out...')
    removeCookie('user')
    setShowModal(false)
    window.location.href = '/login'
  }

  const handleCancelLogout = () => {
    setShowModal(false)
  }

  return (
    <>
      <button
        onClick={handleLogOut}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded">
        Log Out
      </button>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Are you sure you want to log out?
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Logging out will redirect you to the login page.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleConfirmLogout}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Log Out
                </button>
                <button
                  onClick={handleCancelLogout}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default LogOut
