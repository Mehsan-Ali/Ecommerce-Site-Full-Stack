import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AddToCartData, CartState } from '../../types/Product'

const storedCart = localStorage.getItem('cart')
const initialState: CartState = storedCart
  ? JSON.parse(storedCart)
  : {
      items: [],
      totalAmount: 0,
      totalItems: 0
    }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart (state, action: PayloadAction<AddToCartData>) {
      const product = action.payload

      const existingProduct = state.items.find(item => item._id === product._id)

      if (existingProduct) {
        existingProduct.quantity += 1
        existingProduct.size += product.size
      } else {
        state.items.push({ ...product, quantity: 1 })
      }
      state.totalItems += 1
      state.totalAmount += product.price
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state))
    },
    // removeFromCart (state, action: PayloadAction<string>) {
    //   const productId = action.payload
    //   const existingItem = state.items.find(item => item._id === productId)

    //   if (existingItem) {
    //     state.totalItems -= existingItem.quantity
    //     state.totalAmount -= existingItem.price * existingItem.quantity
    //     state.items = state.items.filter(item => item._id !== productId)
    //   }
    // },
    removeFromCart (
      state,
      action: PayloadAction<{ _id: string; size: string }>
    ) {
      const { _id, size } = action.payload

      state.items = state.items.filter(
        item => !(item._id === _id && item.size === size)
      )

      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      )
      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )

      localStorage.setItem('cart', JSON.stringify(state))
    },
    // decreaseQuantity (state, action: PayloadAction<string>) {
    //   const productId = action.payload
    //   const item = state.items.find(item => item._id === productId)

    //   if (item) {
    //     if (item.quantity > 1) {
    //       item.quantity -= 1
    //       state.totalItems -= 1
    //       state.totalAmount -= item.price
    //     } else {
    //       // if quantity is 1, remove the item entirely
    //       state.items = state.items.filter(i => i._id !== productId)
    //       state.totalItems -= 1
    //       state.totalAmount -= item.price
    //     }
    //   }
    // },
    decreaseQuantity (
      state,
      action: PayloadAction<{ _id: string; size: string }>
    ) {
      const { _id, size } = action.payload

      const item = state.items.find(
        item => item._id === _id && item.size === size
      )

      if (!item) return

      if (item.quantity > 1) {
        item.quantity -= 1
      } else {
        state.items = state.items.filter(
          i => !(i._id === _id && i.size === size)
        )
      }

      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      )
      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )

      localStorage.setItem('cart', JSON.stringify(state))
    },
    clearCart (state) {
      state.items = []
      state.totalAmount = 0
      state.totalItems = 0

      localStorage.removeItem('cart')
    }
  }
})

export const { addToCart, removeFromCart, decreaseQuantity, clearCart } =
  cartSlice.actions
export default cartSlice.reducer
