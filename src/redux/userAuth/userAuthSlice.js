// usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import toast from 'react-hot-toast'
import { initialState } from './state'

// register
// export const registerUser = createAsyncThunk('user/registerUser', async (formData) => {
//   try {
//     const response = await axios.post('http://localhost:8000/users', formData)
//     toast.success('Successfully register!')
//     console.log('response', response)
//     return response.data
//   } catch (error) {
//     throw new Error('Failed to fetch users')
//   }
// })

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
      console.log('response', response)
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

// export const loginUser = createAsyncThunk('user/loginUser', async ({ email, password, role }) => {
//   try {
//     const response = await axios.post('http://localhost:8000/users', { email, password, role })
//     toast.success('Successfully logged in!')
//     return response.data
//   } catch (error) {
//     throw new Error('Failed to login')
//   }
// })

// export const loginUser = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
//   try {
//     const response = await axios.post('http://localhost:8000/users', {
//       params: {
//         email: data.email,
//         password: data.password,
//       },
//     })
//     const userData = response.data.find(
//       (user) => user.email === data.email && user.password === data.password
//     )
//     if (userData) {
//       return userData
//     } else {
//       return rejectWithValue('Invalid credentials')
//     }
//   } catch (error) {
//     return rejectWithValue(error.message)
//   }
// })

export const loginUser = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:8000/users', {
      email: data.email,
      password: data.password,
    })

    const userData = response.data.find(
      (user) => user.email === data.email && user.password === data.password
    )

    if (userData) {
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
  },
})

export default userAuthSlice.reducer
