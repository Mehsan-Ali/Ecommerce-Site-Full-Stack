import { client } from "./client"

export const getUserOrders = async (userId: string) => {
  try {
    const response = await client.post("/api/order/user-orders",userId,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}
