import { useState } from 'react'
import { assets } from '../assets/assets'
import { useForm } from 'react-hook-form'
import { Title } from '../components/Title'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { type OrderFormData, orderFormSchema } from '../utils/orderFormValidate'
import { zodResolver } from '@hookform/resolvers/zod'
import { client } from '../APIs/client'
import { toast } from 'react-toastify'
import { clearCart } from '../store/slice/cartSlice'

export const PlaceOrder = () => {
    const dispatch = useAppDispatch()
    const { handleSubmit, register, reset, formState: { errors } } = useForm<OrderFormData>({ resolver: zodResolver(orderFormSchema) })
    const { token, user } = useAppSelector((state) => state.user)
    const { totalAmount, delivery_fee, total, items } = useAppSelector((state) => state.cart)
    const [method, setMethod] = useState('cod')

    const submitData = async (data: OrderFormData) => {
        if (!user) return alert('User not found')
        try {
            let orderItems = []
            // console.log(data)
            for (let i = 0; i < items.length; i++) {
                orderItems.push({
                    productId: items[i]._id,
                    title: items[i].name,
                    itemImage: items[i].image,
                    itemPrice: items[i].price,
                    quantity: items[i].quantity,
                    size: items[i].size,
                    category: items[i].category,
                    subCategory: items[i].subCategory,
                    bestSeller: items[i].bestSeller
                })
            }
            const order = {
                userId: user._id,
                items: orderItems,
                amount: totalAmount + delivery_fee,
                address: data,
                paymentMethod: method,
                payment: false,
                date: Date.now()
            }
            switch (method) {
                // ------ Api Call for COD ------
                case 'cod':
                    try {
                        const resp = await client.post('/api/order/place', order, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                        if (resp.data.success) {
                            toast.success(resp.data.message)
                            console.log(resp.data)
                            dispatch(clearCart())
                            reset()
                        }
                    } catch (error: any) {
                        console.log(error)
                        toast.error(error.response?.data?.message)
                    }
                    break;

                case 'stripe':
                    try {
                        const respose = await client.post('/api/order/stripe', order, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                        if (respose.data.success) {
                            const { session_url } = respose.data
                            window.location.replace(session_url)
                        } else {
                            toast.error(respose.data.message)
                            console.log(respose.data)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                    break;
                default:
                    break;
            }
            console.log(order)

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form onSubmit={handleSubmit(submitData)} className='flex flex-wrap md:flex-nowrap gap-15 mx-5 sm:mx-14 md:mx-20 py-10'>
            {/* <div>
                {items.map((item, index) => (
                    <div key={index} className='flex flex-col gap-5'>
                        <div className='flex gap-5'>
                            <img src={item.image} alt="" className='w-20' />
                            <div className='flex flex-col gap-1'>
                                <p className='text-sm sm:text-base'>{item.name}</p>
                                <p className='text-sm sm:text-base'>Quantity: {item.quantity}</p>
                                <p className='text-sm sm:text-base'>Size: {item.size}</p>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <p className='text-sm sm:text-base'>{item.price}</p>
                            <p className='text-sm sm:text-base'>{item.price * item.quantity}</p>
                        </div>
                    </div>
                ))}
            </div> */}
            {/* --------------- Delivery Info --------------- */}
            <div className='flex-1/2 flex flex-col gap-5'>
                <div className='text-lg sm:text-2xl uppercase'>
                    <Title text1='Delivery' text2='Information' />
                </div>

                <div className='text-gray-600 space-y-2 text-xs sm:text-sm'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="firstName">First Name</label>
                            <input {...register('firstName')} type="text" id="firstName" placeholder='Enter Your Name' className='border border-gray-200 outline-none px-3 py-2 w-full' />
                            {errors.firstName && <p className='text-red-500 text-xs'>{errors.firstName.message}</p>}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="lastName">Last Name</label>
                            <input {...register('lastName')} type="text" name="lastName" id="lastName" placeholder='Enter Your Name' className='border border-gray-200 outline-none px-3 py-2 w-full' />
                            {errors.lastName && <p className='text-red-500 text-xs'>{errors.lastName.message}</p>}
                        </div>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email">Email</label>
                        <input {...register('email')} type="text" name="email" id="email" placeholder='Enter Your Email' className='border border-gray-200 outline-none px-3 py-2 w-full' />
                        {errors.email && <p className='text-red-500 text-xs'>{errors.email.message}</p>}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="address">Address</label>
                        <input {...register('address')} type="text" name="address" id="address" placeholder='Enter Your Address' className='border border-gray-200 outline-none px-3 py-2 w-full' />
                        {errors.address && <p className='text-red-500 text-xs'>{errors.address.message}</p>}
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="city">City</label>
                            <input {...register('city')} type="text" name="city" id="city" placeholder='Enter Your City' className='border border-gray-200 outline-none px-3 py-2 w-full' />
                            {errors.city && <p className='text-red-500 text-xs'>{errors.city.message}</p>}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="state">State</label>
                            <input {...register('state')} type="text" name="state" id="state" placeholder='Enter Your State' className='border border-gray-200 outline-none px-3 py-2 w-full' />
                            {errors.state && <p className='text-red-500 text-xs'>{errors.state.message}</p>}
                        </div>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="zipcode">Zip Code</label>
                            <input {...register('zipCode')} type="text" name="zipCode" id="zipCode" placeholder='Enter Your zip code' className='border border-gray-200 outline-none px-3 py-2 w-full' />
                            {errors.zipCode && <p className='text-red-500 text-xs'>{errors.zipCode.message}</p>}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="country">Country</label>
                            <input {...register('country')} type="text" name="country" id="country" placeholder='Enter Your Country' className='border border-gray-200 outline-none px-3 py-2 w-full' />
                            {errors.country && <p className='text-red-500 text-xs'>{errors.country.message}</p>}
                        </div>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input {...register('phoneNumber')} type="text" name="phoneNumber" id="phoneNumber" placeholder='Enter Your Phone Number' className='border border-gray-200 outline-none px-3 py-2 w-full' />
                        {errors.phoneNumber && <p className='text-red-500 text-xs'>{errors.phoneNumber.message}</p>}
                    </div>
                </div>
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
                    <div className='flex justify-end py-5 '>
                        <button type='submit' className='bg-black my-auto py-2 w-1/2 cursor-pointer rounded-sm uppercase text-white'>
                            Place order
                        </button>
                    </div>

                </div>
            </div>
        </form>
    )
}
