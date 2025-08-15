import { client } from './client'

// Add item to cart
export const addToCartAPI = async (userId: string, itemId: string, size: string) => {
  try {
    const token = localStorage.getItem('token')
    const response = await client.post('/api/cart/add', 
      { userId, itemId, size },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to add item to cart')
  }
}

// Remove item from cart (decrease quantity by 1)
export const removeFromCartAPI = async (userId: string, itemId: string, size: string) => {
  try {
    const token = localStorage.getItem('token')
    const response = await client.post('/api/cart/remove', 
      { userId, itemId, size },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to remove item from cart')
  }
}

// Update cart item quantity
export const updateCartAPI = async (userId: string, itemId: string, size: string, quantity: number) => {
  try {
    const token = localStorage.getItem('token')
    const response = await client.post('/api/cart/update', 
      { userId, itemId, size, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update cart')
  }
}

// Get user cart
export const getUserCartAPI = async (userId: string) => {
  try {
    const token = localStorage.getItem('token')
    const response = await client.post('/api/cart/get', 
      { userId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to get cart data')
  }
}

// Clear entire cart
// export const clearCartAPI = async (userId: string) => {
//   try {
//     const token = localStorage.getItem('token')
//     const response = await client.post('/api/cart/clear', 
//       { userId },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//     )
//     return response.data
//   } catch (error: any) {
//     throw new Error(error.response?.data?.message || 'Failed to clear cart')
//   }
// }
