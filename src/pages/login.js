import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { loginUser } from '../redux/userAuth/userAuthSlice'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function Login() {
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    role: Yup.string().required('Role is required'),
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      role: '',
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      if (values.role === 'patient') {
        dispatch(loginUser({ email: values.email, password: values.password, role: values.role }))
        localStorage.setItem(
          'userData',
          JSON.stringify({
            email: values.email,
            role: values.role,
            loginTime: new Date().toISOString(),
          })
        )
        navigate('/patientDashboard')
      } else if (values.role === 'doctor') {
        dispatch(loginUser({ email: values.email, password: values.password, role: values.role }))
        localStorage.setItem(
          'userData',
          JSON.stringify({
            email: values.email,
            role: values.role,
            loginTime: new Date().toISOString(),
          })
        )
        navigate('/doctorDashboard')
      } else {
        toast.error('Invalid role selected. Please select the correct role.')
      }
    },
  })

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="flex h-full justify-center items-center">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Select Role
                </label>
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="doctor"
                      checked={formik.values.role === 'doctor'}
                      onChange={formik.handleChange}
                    />
                    <span className="ml-2">Doctor</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      name="role"
                      value="patient"
                      checked={formik.values.role === 'patient'}
                      onChange={formik.handleChange}
                    />
                    <span className="ml-2">Patient</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      checked={formik.values.role === 'admin'}
                      onChange={formik.handleChange}
                    />
                    <span className="ml-2">Admin</span>
                  </label>
                </div>
              </div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address / user Name
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
              ) : null}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  {/* <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a> */}
                  <Link
                    to="/reset-password"
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
              ) : null}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link
              to="/reset-password"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
