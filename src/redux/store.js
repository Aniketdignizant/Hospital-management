import { configureStore } from '@reduxjs/toolkit'
import patientReducer from './userAuth/userAuthSlice'

const store = configureStore({
  reducer: {
    users: patientReducer,
  },
})

export default store
