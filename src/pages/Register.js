import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from '../Schema.js/RegisterSchema'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUsers, registerUser } from '../redux/userAuth/userAuthSlice'
import { useNavigate } from 'react-router-dom'

function Register() {
  const dispatch = useDispatch()
  const [selectedOption, setSelectedOption] = useState('')
  const { status, users } = useSelector((state) => state.users)
  const [isRegistered, setIsRegistered] = useState(false)
  console.log('users', users)
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [])

  const formik = useFormik({
    initialValues,

    validationSchema,

    //   onSubmit: async (values) => {
    //     const { email, id, password, user_name } = values
    //     const data = { role: selectedOption, email: email, id: id, password: password, user_name }
    //     dispatch(registerUser(data))
    //     toast.success('user fetched successfully!')
    //     console.log('data', data)
    //   },
    // })
    // onSubmit: async (values) => {
    //   const { email, id, password, user_name } = values
    //   const data = { role: selectedOption, email, id, password, user_name }

    //   if (isRegistered) {
    //     toast.error('User already registered!')
    //     return
    //   }
    //   dispatch(registerUser(data))
    //   setIsRegistered(true)
    //   localStorage.setItem('userData', JSON.stringify(data))
    //   document.cookie = `userData=${JSON.stringify(data)}; expires=${new Date(Date.now() + 86400e3).toUTCString()}; path=/`
    //   console.log('data', data)
    // },
    //   onSubmit: async (values) => {
    //     const { email, id, password, user_name } = values
    //     const data = { role: selectedOption, email, id, password, user_name }

    //     if (isRegistered) {
    //       toast.error('User already registered!')
    //       return
    //     }

    //     dispatch(registerUser(data))
    //     setIsRegistered(true)

    //     console.log('data', data)
    //   },
    // })

    onSubmit: async (values) => {
      const { email, id, password, user_name } = values
      const data = { role: selectedOption, email, id, password, user_name }

      if (isRegistered) {
        toast.error('User already registered!')
        return
      }

      dispatch(registerUser(data))
      setIsRegistered(true)

      // Redirect based on role
      switch (selectedOption) {
        case 'patient':
          navigate('/patientDashboard')
          break
        case 'doctor':
          navigate('/doctorDashboard')
          break
        case 'admin':
          navigate('/adminDashboard')
          break
        default:
          navigate('/')
      }

      console.log('data', data)
    },
  })

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
  }

  console.log('error', formik.errors)

  return (
    <div className="flex h-full justify-center items-center">
      <form
        className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg text-center"
        onSubmit={formik.handleSubmit}>
        <div className="justify-center items-center font-sans text-xl">Register</div>
        <div className="mt-1">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="patient"
              value="patient"
              checked={selectedOption === 'patient'}
              onChange={handleOptionChange}
              onBlur={formik.handleBlur}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2">Patient</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="radio"
              name="doctor"
              value="doctor"
              checked={selectedOption === 'doctor'}
              onChange={handleOptionChange}
              onBlur={formik.handleBlur}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2">Doctor</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="radio"
              name="admin"
              value="admin"
              checked={selectedOption === 'admin'}
              onChange={handleOptionChange}
              onBlur={formik.handleBlur}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2">Admin</span>
          </label>
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-400">
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={`block w-full px-3 py-2.5 mt-1 text-sm text-gray-900 bg-transparent border-b-2 ${formik.errors.email} focus:outline-none focus:border-blue-600 dark:text-white dark:border-gray-600 dark:focus:border-blue-500`}
            placeholder="john.doe@example.com"
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="mb-5">
            <label
              htmlFor="user_name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              user_name
            </label>
            <input
              type="text"
              name="user_name"
              id="user_name"
              className="block w-full px-3 py-2.5 mt-1 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 dark:text-white dark:border-gray-600 dark:focus:border-blue-500"
              placeholder="user_name"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.user_name}
            />
            {formik.touched.user_name && formik.errors.user_name ? (
              <div className="text-red-500 text-sm">{formik.errors.user_name}</div>
            ) : null}
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-400">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className={`block w-full px-3 py-2.5 mt-1 text-sm text-gray-900 bg-transparent border-b-2 ${formik.errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-600 dark:text-white dark:border-gray-600 dark:focus:border-blue-500`}
            placeholder="Password"
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="mb-5">
          <label
            htmlFor="repeat_password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-400">
            Confirm password
          </label>
          <input
            type="password"
            name="repeat_password"
            id="repeat_password"
            className="block w-full px-3 py-2.5 mt-1 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 dark:text-white dark:border-gray-600 dark:focus:border-blue-500"
            placeholder="Confirm password"
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.repeat_password}
          />
          {formik.touched.repeat_password && formik.errors.repeat_password ? (
            <div className="text-red-500 text-sm">{formik.errors.repeat_password}</div>
          ) : null}
        </div>

        <button
          type="submit"
          className="w-full px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled={status === 'loading'}>
          {status === 'loading' ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}

export default Register
