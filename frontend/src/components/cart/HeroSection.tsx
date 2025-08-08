import React from 'react'
import { Title } from '../Title'
import { useAppSelector } from '../../store/hooks'

const HeroSection = () => {
    const { items, totalItems, totalAmount } = useAppSelector((state) => state.cart)
    return (
        <div className='px-5 md:px-36'>
            <div className='flex flex-col my-10 justify-center items-center text-2xl sm:text-4xl'>
                <Title text1='Shopping' text2='Cart' />
            </div>

            <div className='flex flex-col items-center'>
                {
                    items.length <= 0 ?
                        <div className='flex justify-center items-center h-56 '>
                            <h1 className='text-xl sm:text-2xl text-gray-600'>Your Cart is Empty</h1>
                        </div> :
                        items.map((item) => (
                            <div key={item._id} className='flex gap-2 sm:gap-5 border-t flex-1/2 w-full border-gray-200 sm:px-10 py-5'>
                                <img src={item.image} alt={item.name} className='w-28 sm:w-36 rounded-md' />
                                <div className='flex justify-between flex-col text-gray-700 text-sm grow'>
                                    <div className='flex justify-between sm:text-lg'>
                                        <h3>{item.name}</h3>
                                        <p>${item.price}</p>
                                    </div>
                                    <span className='space-y-1'>
                                        <h6>Color</h6>
                                        <h6>Size: {item.size.split('').join(', ')}</h6>
                                    </span>
                                    <span>
                                        <h6>Quantity: <span className='font-semibold px-2'>{item.quantity}</span></h6>
                                    </span>
                                    <span className='flex justify-between'>
                                        <h6>In Stock</h6>
                                        <h6>Remove</h6>
                                    </span>
                                </div>
                            </div>
                        ))
                }
            </div>
            {
                items.length > 0 &&
                <div className='flex flex-col items-center text-gray-600 mx-auto bg-gray-100/70 mt-5 sm:mt-10 py-5 rounded-md px-5 sm:px-10 max-w-xl text-sm sm:text-base'>
                    {/* <div className='flex justify-between w-full border-b border-gray-300 py-5'>
                        <span>Subtotal</span>
                        <span>${totalAmount.toFixed(2)}</span>
                    </div> */}
                    <div className='flex justify-between w-full border-b border-gray-300 py-5'>
                        <span>Total Items</span>
                        <span>{totalItems.toFixed(2)}</span>
                    </div>
                    <div className='flex justify-between w-full py-5 font-semibold text-base sm:text-lg'>
                        <span>Order Total</span>
                        <span>${totalAmount.toFixed(2)}</span>
                    </div>
                </div>

            }
        </div>
    )
}

export default HeroSection
