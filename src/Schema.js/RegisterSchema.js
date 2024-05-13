export const initialValues = {
  email: '',
  password: '',
  repeatPassword: '',
  firstName: '',
  lastName: '',
  phone: '',
  company: '',
}

export const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  phone: Yup.string()
    .matches(/^\d{3}-\d{3}-\d{4}$/, 'Invalid phone number')
    .required('Phone number is required'),
  company: Yup.string().required('Company name is required'),
})
