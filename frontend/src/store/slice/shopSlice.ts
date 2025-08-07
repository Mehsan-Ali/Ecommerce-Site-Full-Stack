import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '../../types/Product'
import { products } from '../../assets/assets'

interface ShopState {
  products: Product[]
  currency: string
  delivery_fee: number
  search: string
  showSearch: boolean
}

const initialState: ShopState = {
  products: products,
  currency: '$',
  delivery_fee: 10,
  search: '',
  showSearch: false
}

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setCurrency (state, action: PayloadAction<string>) {
      state.currency = action.payload
    },
    setDeliveryFee (state, action: PayloadAction<number>) {
      state.delivery_fee = action.payload
    },
    setSearch (state, action: PayloadAction<string>) {
      state.search = action.payload
    },
    setShowSearch (state, action: PayloadAction<boolean>) {
      state.showSearch = action.payload
    }
  }
})

export const { setCurrency, setDeliveryFee, setSearch, setShowSearch } =
  shopSlice.actions
export default shopSlice.reducer
