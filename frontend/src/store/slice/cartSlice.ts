import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CartState, Product } from '../../types/Product'

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalItems: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart (state, action: PayloadAction<Product>) {
      const product = action.payload
      const existingProduct = state.items.find(item => item._id === product._id)
      if (existingProduct) {
        existingProduct.quantity += 1
      } else {
        state.items.push({ ...product, quantity: 1 })
      }
      state.totalAmount += product.price
    },
    removeFromCart (state, action: PayloadAction<string>) {
      const productId = action.payload
      const existingItem = state.items.find(item => item._id === productId)

      if (existingItem) {
        state.totalItems -= existingItem.quantity
        state.totalAmount -= existingItem.price * existingItem.quantity
        state.items = state.items.filter(item => item._id !== productId)
      }
    },
    decreaseQuantity (state, action: PayloadAction<string>) {
      const productId = action.payload
      const item = state.items.find(item => item._id === productId)

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1
          state.totalItems -= 1
          state.totalAmount -= item.price
        } else {
          // if quantity is 1, remove the item entirely
          state.items = state.items.filter(i => i._id !== productId)
          state.totalItems -= 1
          state.totalAmount -= item.price
        }
      }
    },
    clearCart (state) {
      state.items = []
      state.totalAmount = 0
      state.totalItems = 0
    }
  }
})

export const { addToCart, removeFromCart, decreaseQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer