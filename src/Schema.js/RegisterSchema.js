import * as Yup from 'yup'

export const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  repeat_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
  user_name: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .matches(/^[a-zA-Z0-9_]*$/, 'Username can only contain letters, numbers, and underscores'),
})

export const initialValues = {
  email: '',
  password: '',
  repeat_password: '',
  user_name: '',
  patient: '',
  doctor: '',
}
