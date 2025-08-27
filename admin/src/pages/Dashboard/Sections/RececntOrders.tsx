import axios from 'axios'
import { Eye, ShoppingCart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { backednUrl } from '../../../App'
import { NavLink } from 'react-router-dom'

const RececntOrders = ({ token }: { token: string }) => {
    const [rececntOrders, setRececntOrders] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchRececntOrders = async () => {
        try {
            const resp = await axios.get(`${backednUrl}/api/order/orders?page=1&limit=4`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = resp.data
            if (data.success) {
                setRececntOrders(data.allOrders)
            }

        } catch (error) {
            console.log(error)
        }
    }
    console.log(rececntOrders)
    useEffect(() => {
        fetchRececntOrders()
    }, [token])
    return (
        <div className='grow'>
            <div className='bg-gray-100 border-gray-200 grow border p-5 h-full space-y-8 rounded-lg'>
                <div className='flex justify-between items-end'>
                    <span>
                        <h5 className='text-base sm:text-lg font-bold text-gray-900'>Recent Orders</h5>
                        <p className='text-xs sm:text-sm'>You have {rececntOrders.length} orders this week.</p>
                    </span>
                    <NavLink to={'/orders'}>
                        <button className='flex gap-2 items-center border-2 font-medium border-gray-200 rounded-lg bg-gray-50 shadow-md px-4 py-2 text-sm cursor-pointer'><Eye size={18} /> View All</button>
                    </NavLink>
                </div>
                <div>
                    {rececntOrders.map((data: any, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-[1fr_3fr_auto] gap-4 py-2 items-center'>
                                <span className='text-sm text-gray-500'><ShoppingCart strokeWidth={1.5} className='size-5' /></span>
                                <span className='text-sm text-gray-600'>
                                    <p className='font-medium text-gray-800'>{data?.address.firstName}</p>
                                    <p className='text-xs'>Order #{data._id.slice(0, 5)}</p>
                                </span>
                                <span className='text-xs text-gray-500 flex gap-2 items-center'>
                                    <p className={`font-medium px-2 py-1 rounded-lg ${data.status === "Delivered" ? "bg-green-100 text-green-600" : data.status === "Order Placed" ? "bg-gray-200 text-gray-700" : data.status === "Shipped" ? "bg-blue-100 text-blue-600" : data.status === "Processing" ? "bg-yellow-100 text-yellow-600" : "bg-red-100 text-red-600"}`}>{data.status}</p>
                                    <p className='font-medium text-sm text-gray-900'>${data.amount.toFixed(2)}</p>
                                </span>
                            </div>
                            <hr className='border-gray-200' />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RececntOrders
