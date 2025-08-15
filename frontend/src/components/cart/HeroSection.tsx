import { Title } from '../Title'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../../store/slice/cartSlice'
import { MinusCircleIcon, PlusCircle, Trash, Trash2Icon } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const HeroSection = () => {
    const dispatch = useAppDispatch()
    // const { delivery_fee } = useAppSelector((state) => state.shop)
    const { items, totalItems,totalAmount, delivery_fee, total } = useAppSelector((state) => state.cart)
    
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
                                        <h6>Size: {item.size.match(/XXL|XL|S|M|L/g)?.join(', ')}</h6>
                                    </span>
                                    <span className='flex items-center gap-5'>
                                        <h6>Quantity:</h6>
                                        <span className='flex gap-5 items-center font-semibold px-2'>
                                            <button className='p-2 rounded-md text-gray-50 bg-green-600/90 cursor-pointer' onClick={() => dispatch(increaseQuantity(item))}>
                                                <PlusCircle />
                                            </button>
                                            <span className='border border-gray-500 rounded-md px-5 py-1'>
                                                {item.quantity}
                                            </span>
                                            <button className='text-gray-50 bg-red-600 p-2 rounded-md cursor-pointer' onClick={() => dispatch(decreaseQuantity(item))}>
                                                <MinusCircleIcon />
                                            </button>
                                        </span>
                                    </span>
                                    <span className='flex justify-between items-center'>
                                        <h6 className='text-green-600'>In Stock</h6>
                                        <span onClick={() => dispatch(removeFromCart(item))} className='text-red-600 cursor-pointer bg-gray-300/20 p-2 rounded-xl hover:scale-105 transition-all duration-200'><Trash2Icon /></span>
                                    </span>
                                </div>
                            </div>
                        ))
                }
            </div>
            {
                items.length > 0 &&
                <div className='flex flex-col items-center text-gray-600 mx-auto bg-gray-100/70 mt-5 sm:mt-10 py-5 rounded-md px-5 sm:px-10 max-w-xl text-sm sm:text-base'>
                    <div className='flex justify-center'>
                        <Title text1='Order' text2='Summary' />
                    </div>
                    <div className='flex justify-between w-full border-b border-gray-300 py-5'>
                        <span>Cart Total</span>
                        <span>${totalAmount.toFixed(2)}</span>
                    </div>
                    <div className='flex justify-between w-full border-b border-gray-300 py-5'>
                        <span>Shipping Fee</span>
                        <span>${delivery_fee.toFixed(2)}</span>
                    </div>
                    <div className='flex justify-between w-full py-5 font-semibold text-base sm:text-lg'>
                        <span>Order Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <NavLink to={'/place-order'}> 
                        <button className='bg-black py-4 text-white px-6 text-xs sm:text-sm uppercase rounded-sm font-semibold cursor-pointer'>
                            Proceed to Checkout
                        </button>
                    </NavLink>
                </div>

            }
        </div>
    )
}

export default HeroSection
