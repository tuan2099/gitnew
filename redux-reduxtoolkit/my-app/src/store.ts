import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './pages/blog/blog.slice'
export const store = configureStore({
  reducer: {
    Blog: blogReducer
  }
})
// Lấy Roostate và appdispatch từ store
export type Roostate = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
