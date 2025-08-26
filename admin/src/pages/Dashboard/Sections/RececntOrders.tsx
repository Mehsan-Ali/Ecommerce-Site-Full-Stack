import axios from 'axios'
import { Eye, ShoppingCart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { backednUrl } from '../../../App'

const RececntOrders = ({ token }: { token: string }) => {
    const [rececntOrders, setRececntOrders] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchRececntOrders = async () => {
        try {
            const resp = await axios.get(`${backednUrl}/api/order/orders?page=1&limit=3`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = resp.data
            if (data.success) {
                setRececntOrders(data.allOrders)
                console.log(rececntOrders)
            }

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchRececntOrders()
    },[token])
    return (
        <div className='grow'>
            <div className='bg-gray-100 border-gray-200 grow border p-5 h-full space-y-8 rounded-lg'>
                <div className='flex justify-between items-end'>
                    <span>
                        <h5 className='text-base sm:text-lg font-bold text-gray-900'>Recent Orders</h5>
                        <p className='text-xs sm:text-sm'>You have 5 orders this week.</p>
                    </span>
                    <button className='flex gap-2 items-center border-2 font-medium border-gray-200 rounded-lg bg-gray-50 shadow-md px-4 py-2 text-sm cursor-pointer'><Eye size={18} /> View All</button>
                </div>
                <div>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div>
                            <div key={index} className='grid grid-cols-[1fr_3fr_auto] gap-4 py-2 items-center'>
                                <span className='text-sm text-gray-500'><ShoppingCart strokeWidth={1.5} className='size-5' /></span>
                                <span className='text-sm text-gray-600'>
                                    <p className='font-medium text-gray-800'>Wireless Headphones</p>
                                    <p>1234 sales</p>
                                </span>
                                <span className='text-xs text-gray-500 flex gap-2 items-center'>
                                    <p className='font-medium bg-gray-700 text-white px-2 py-1 rounded-lg'>Completed</p>
                                    <p className='font-medium text-sm text-gray-900'>$42.25</p>
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
