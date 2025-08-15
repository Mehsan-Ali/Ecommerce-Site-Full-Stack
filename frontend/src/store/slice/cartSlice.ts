import {
  createAsyncThunk,
  createSlice,
  type PayloadAction
} from '@reduxjs/toolkit'
import type { AddToCartData, ExtendedCartState } from '../../types/Product'
import {
  addToCartAPI,
  getUserCartAPI,
  removeFromCartAPI,
  updateCartAPI
} from '../../APIs/cartAPI'

interface AddtoCartData {
  userId: string
  itemId: string
  size: string
}
const storedCart = localStorage.getItem('cart')
const initialState: ExtendedCartState = storedCart
  ? JSON.parse(storedCart)
  : {
      items: [],
      totalAmount: 0,
      totalItems: 0,
      delivery_fee: 10,
      total: 0
    }

// ---------- Add to cart ----------
export const addtToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async ({ userId, itemId, size }: AddtoCartData) => {
    try {
      const result = await addToCartAPI(userId, itemId, size)
      return result
    } catch (error: any) {
      console.log(error)
    }
  }
)

// ---------- Get the user cart ----------
export const getCartAsync = createAsyncThunk(
  'cart/addToCart',
  async ({ userId }: { userId: string }) => {
    try {
      const result = await getUserCartAPI(userId)
      return result
    } catch (error: any) {
      console.log(error)
    }
  }
)
// ---------- Update the user cart ----------
export const updateCartAsync = createAsyncThunk(
  'cart/addToCart',
  async ({
    userId,
    itemId,
    size,
    quantity
  }: {
    userId: string
    itemId: string
    size: string
    quantity: number
  }) => {
    try {
      const result = await updateCartAPI(userId, itemId, size, quantity)
      return result
    } catch (error: any) {
      console.log(error)
    }
  }
)

// ---------- Delete the user cart by size ----------
export const deleteCartBySizeAsync = createAsyncThunk(
  'cart/addToCart',
  async ({
    userId,
    itemId,
    size
  }: {
    userId: string
    itemId: string
    size: string
  }) => {
    try {
      const result = await removeFromCartAPI(userId, itemId, size)
      return result
    } catch (error: any) {
      console.log(error)
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<any[]>) => {
      state.items = action.payload
      state.totalItems = action.payload.reduce(
        (sum, item) => sum + item.quantity,
        0
      )
      state.totalAmount = action.payload.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
      state.total = state.totalAmount + state.delivery_fee
    },
    clearError: state => {
      state.error = null
    },
    addToCart (state, action: PayloadAction<AddToCartData>) {
      const product = action.payload
      const size = product.size

      const existingProduct = state.items.find(
        item => item._id === product._id && item.size === size
      )

      if (existingProduct) {
        existingProduct.quantity += 1
      } else {
        state.items.push({ ...product, size, quantity: 1 })
      }
      state.totalItems += 1
      state.totalAmount += product.price
      state.total = state.totalAmount + state.delivery_fee

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state))
    },

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
      state.total = state.totalAmount + state.delivery_fee

      localStorage.setItem('cart', JSON.stringify(state))
    },
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
      state.total = state.totalAmount + state.delivery_fee
      localStorage.setItem('cart', JSON.stringify(state))
    },
    increaseQuantity (
      state,
      action: PayloadAction<{ _id: string; size: string }>
    ) {
      const { _id, size } = action.payload
      const item = state.items.find(
        item => item._id === _id && item.size === size
      )

      if (item) {
        if (item.quantity > 0) {
          item.quantity += 1
          state.totalItems += 1
          state.totalAmount += item.price
          state.total = state.totalAmount + state.delivery_fee
        } else {
          // if quantity is 1, remove the item entirely
          state.items = state.items.filter(i => i._id !== _id)
          state.totalItems -= 1
          state.totalAmount -= item.price
        }
      }
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

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart
} = cartSlice.actions
export default cartSlice.reducer
