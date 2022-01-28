import { configureStore } from '@reduxjs/toolkit'

import blockReducer from './block'
import authReducer from './auth'

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    block: blockReducer,
    auth: authReducer,
  },
  middleware: [...getDefaultMiddleware({ thunk: true, serializableCheck: false })],
})

export default store