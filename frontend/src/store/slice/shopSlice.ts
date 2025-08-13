import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '../../types/Product'
import { client } from '../../APIs/client'

interface ShopState {
  products: Product[]
  currency: string
  delivery_fee: number
  search: string
  showSearch: boolean
}
export const fetchProducts = createAsyncThunk(
  'shop/fetchProducts',
  async () => {
    const resp = await client.get('/api/product/list')
    console.log(resp.data)
    return resp.data.allProduct
  }
)
const initialState: ShopState = {
  products: [],
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload
    })
  }
})

export const { setCurrency, setDeliveryFee, setSearch, setShowSearch } = shopSlice.actions
export default shopSlice.reducer
