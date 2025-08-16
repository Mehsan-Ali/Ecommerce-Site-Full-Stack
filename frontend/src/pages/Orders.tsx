import React, { useEffect } from 'react'
import { Title } from '../components/Title'
import { useAppSelector } from '../store/hooks'

export const Orders = () => {
    const { items } = useAppSelector((state) => state.cart)
    
    const { currency } = useAppSelector((state) => state.shop)

    // useEffect(() => {
        
    // },)
    return (
        <div className='py-10 px-5 md:px-20'>
            <div className='text-xl sm:text-2xl uppercase py-5'>
                <Title text1='My' text2='Orders' />
            </div>
            <div className='flex flex-col'>
                {
                    items.length > 0 ?
                        items.map((item) => (
                            <div key={item._id} className='flex gap-5 flex-wrap md:flex-nowrap p-3 sm:p-5 border-y border-gray-200 w-full'>
                                <div className='flex gap-5'>
                                    <img src={item.image} alt="" className='w-22' />
                                    <div className='text-xs sm:text-sm space-y-1.5'>
                                        <p className='font-semibold text-sm sm:text-base'>{item.name}</p>
                                        <div className='flex gap-5 text-gray-800'>
                                            <p>{currency}{item.price}</p>
                                            <p>Quantity: {item.quantity}</p>
                                            <p>Size: {item.size}</p>
                                        </div>
                                        <p className='text-gray-600'>Date: Sat Aug 09 2025</p>
                                        <p className='text-gray-600'>Payment: COD</p>
                                    </div>
                                </div>
                                <div className='ml-auto my-auto text-sm sm:text-base flex items-center gap-1'>
                                    <p className='size-2.5 rounded-full animate-pulse bg-green-600/80'></p>
                                    Order placed
                                </div>
                            </div>
                        ))
                        : <div className='w-full text-center py-10'>
                            <p className='text-2xl text-gray-600'>No orders found</p>
                        </div>
                }

            </div>
        </div>
    )
}
