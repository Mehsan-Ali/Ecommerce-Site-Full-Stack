import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User, UserState } from '../../types/User'

const initialState: UserState = {
  user: null,
  token: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    clearUser: state => {
      state.user = null
      state.token = null
    }
  }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
