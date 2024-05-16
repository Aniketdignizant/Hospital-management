// usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import toast from 'react-hot-toast'
import { initialState } from './state'

// import { useNavigate } from 'react-router-dom'
export const registerUser = createAsyncThunk('user/registerUser', async (formData) => {
  try {
    const existingUserResponse = await axios.get(
      `http://localhost:8000/users?email=${formData.email}`
    )
    const existingUser = existingUserResponse.data[0]

    if (existingUser) {
      toast.error('User already registered!')
      return existingUser
    } else {
      const response = await axios.post('http://localhost:8000/users', formData)
      toast.success('Successfully registered!')
      return response.data
    }
  } catch (error) {
    throw new Error('Failed to fetch users')
  }
})

export const fetchAllUsers = createAsyncThunk('users/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get('http://localhost:8000/users')
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const loginUser = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:8000/users')
    console.log('response=>>>>', response)

    const userData = response.data.find(
      (user) =>
        user.email === data.email && user.password === data.password && user.role === data.role
    )

    if (userData) {
      document.cookie = `userId=${userData.id}`
      toast.success('Login successful')
      return userData
    } else {
      return rejectWithValue({ message: 'Invalid credentials' })
    }
  } catch (error) {
    toast.success('Login successful')
    return rejectWithValue({ message: error.message })
  }
})

export const Userbyemail = createAsyncThunk(
  'auth/GetbyEMAIL',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8000/users?email=${email}`)
      return response.data
    } catch (error) {
      return rejectWithValue('failed to fetch')
    }
  }
)

export const changePassword = createAsyncThunk('auth/ChangePassword', async (data) => {
  // const navigate = useNavigate()
  const { email, oldPassword, newPassword, navigate } = data

  try {
    const response = await axios.get(`http://localhost:8000/users?email=${email}`)
    let users = response.data
    if (!users || users.length === 0) {
      throw new Error('User not found')
    }
    const user = users[0]
    if (user.password !== oldPassword) {
      toast.error('Old password is incorrect')
      throw new Error('Old password is incorrect')
    }
    const updatedUser = {
      ...user,
      password: newPassword,
      // oldPassword: oldPassword,
    }
    await axios.put(`http://localhost:8000/users/${user.id}`, updatedUser)
    toast.success('Password updated successfully')
    navigate('/login')
    return true
  } catch (error) {
    console.error('Error changing password:', error.message)
    return false
  }
})

const userAuthSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'pending'
        state.type = 'USER_REGISTER'
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
        state.status = 'fulfilled'
        state.type = 'USER_REGISTER'
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = false
        state.status = 'rejected'
        state.error = action.error.message
        state.type = 'USER_REGISTER'
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'pending'
        state.type = 'USER_LOGIN'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.currentUser = action.payload
        state.status = 'fulfilled'
        state.type = 'USER_LOGIN'
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = false
        state.status = 'rejected'
        state.error = action.error.message
        state.type = 'USER_LOGIN'
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = 'pending'
        state.type = 'USER_ALLDATA'
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
        state.status = 'fulfilled'
        state.type = 'USER_ALLDATA'
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = false
        state.status = 'rejected'
        state.error = action.error.message
        state.type = 'USER_ALLDATA'
      })
      .addCase(changePassword.pending, (state) => {
        state.status = 'pending'
        state.type = 'USER_RESET_PASSWORD'
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false
        state.currentUser = action.payload
        state.status = 'fulfilled'
        state.type = 'USER_RESET_PASSWORD'
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = false
        state.status = 'rejected'
        state.error = action.error.message
        state.type = 'USER_RESET_PASSWORD'
      })
      .addCase(Userbyemail.pending, (state) => {
        state.status = 'pending'
        state.type = 'USER_BY_EMAIL'
      })
      .addCase(Userbyemail.fulfilled, (state, action) => {
        state.loading = false
        state.currentUser = action.payload
        state.status = 'fulfilled'
        state.type = 'USER_BY_EMAIL'
      })
      .addCase(Userbyemail.rejected, (state, action) => {
        state.status = false
        state.status = 'rejected'
        state.error = action.error.message
        state.type = 'USER_BY_EMAIL'
      })
  },
})

export default userAuthSlice.reducer
