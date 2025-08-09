import { useState } from 'react'
import { assets } from '../assets/assets'
import { Title } from '../components/Title'
import { useAppSelector } from '../store/hooks'
import { useNavigate } from 'react-router-dom'

export const PlaceOrder = () => {
    const { totalAmount, delivery_fee, total } = useAppSelector((state) => state.cart)
    const [method, setMethod] = useState('cod')
    const navigate = useNavigate()
    return (
        <div className='flex flex-wrap md:flex-nowrap gap-15 mx-5 sm:mx-14 md:mx-20 py-10'>
            {/* --------------- Delivery Info --------------- */}
            <div className='flex-1/2 flex flex-col gap-5'>
                <div className='text-lg sm:text-2xl uppercase'>
                    <Title text1='Delivery' text2='Information' />
                </div>

                <form action="" className='text-gray-600 space-y-2 text-xs sm:text-sm'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" name="firstName" id="firstName" placeholder='Enter Your Name' className='border border-gray-200 outline-none px-3 py-2 w-full' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" name="lastName" id="lastName" placeholder='Enter Your Name' className='border border-gray-200 outline-none px-3 py-2 w-full' />
                        </div>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" placeholder='Enter Your Email' className='border border-gray-200 outline-none px-3 py-2 w-full' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="address">Address</label>
                        <input type="text" name="address" id="address" placeholder='Enter Your Address' className='border border-gray-200 outline-none px-3 py-2 w-full' />
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="city">City</label>
                            <input type="text" name="city" id="city" placeholder='Enter Your City' className='border border-gray-200 outline-none px-3 py-2 w-full' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="state">State</label>
                            <input type="text" name="state" id="state" placeholder='Enter Your State' className='border border-gray-200 outline-none px-3 py-2 w-full' />
                        </div>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="zipcode">Zip Code</label>
                            <input type="text" name="city" id="city" placeholder='Enter Your zip code' className='border border-gray-200 outline-none px-3 py-2 w-full' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="country">Country</label>
                            <input type="text" name="country" id="country" placeholder='Enter Your Country' className='border border-gray-200 outline-none px-3 py-2 w-full' />
                        </div>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input type="text" name="phoneNumber" id="phoneNumber" placeholder='Enter Your Phone Number' className='border border-gray-200 outline-none px-3 py-2 w-full' />
                    </div>
                </form>
            </div>
            {/* --------------- Cart Info --------------- */}
            <div className='grow flex-1/2 flex-col gap-5'>
                <div className='text-lg sm:text-2xl uppercase'><Title text1='Cart' text2='Totals' /></div>
                <div className='w-full grow text-sm sm:text-base'>
                    <div className='flex justify-between w-full border-b border-gray-200 py-3'>
                        <span>Shipping Fee</span>
                        <span>${delivery_fee.toFixed(2)}</span>
                    </div>
                    <div className='flex justify-between w-full border-b border-gray-200 py-3'>
                        <span>Cart Total</span>
                        <span>${totalAmount.toFixed(2)}</span>
                    </div>
                    <div className='flex justify-between w-full py-5 font-semibold text-base sm:text-lg'>
                        <span>Order Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
                <div className='mt-2 sm:mt-5'>
                    <Title text1='Payment' text2='Method' />
                    <div className='flex gap-3 flex-col flex-wrap'>
                        <div className='flex w-full items-center gap-3 border border-gray-300 rounded-sm p-2 px-3 cursor-pointer' onClick={() => setMethod('stripe')}>
                            <p className={`min-w-3.5 h-3.5 border border-gray-200 rounded-full ${method === 'stripe' ? 'bg-emerald-300' : ''}`}></p>
                            <img src={assets.stripe_logo} alt="" className='h-5 mx-4' />
                        </div>
                        <div className='flex w-full items-center gap-3 border p-2 px-3 cursor-pointer border-gray-300 rounded-sm' onClick={() => setMethod('razor')}>
                            <p className={`min-w-3.5 h-3.5 border border-gray-200 rounded-full ${method === 'razor' ? 'bg-emerald-300' : ''}`}></p>
                            <img src={assets.razorpay_logo} alt="" className='h-5 mx-4' />
                        </div>
                        <div className='flex w-full items-center gap-3 border p-2 px-3 cursor-pointer border-gray-300 rounded-sm' onClick={() => setMethod('cod')}>
                            <p className={`min-w-3.5 h-3.5 rounded-full border border-gray-200 ${method === 'cod' ? 'bg-emerald-300' : ''}`}></p>
                            <p className='text-gray-600 font-medium'>CASH ON DELIVERY</p>
                        </div>
                    </div>
                    {
                        method === 'cod' ?
                            <div className='flex justify-end py-5 '>
                                <button onClick={() => navigate('/orders')} className='bg-black my-auto py-2 w-1/2 cursor-pointer rounded-sm uppercase text-white'>
                                    Place order
                                </button>
                            </div> : null
                    }

                </div>
            </div>
        </div>
    )
}
