import { Title } from '../Title'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { decreaseQuantity, deleteCartBySizeAsync, increaseQuantity, removeFromCart, updateCartAsync } from '../../store/slice/cartSlice'
import { MinusCircleIcon, PlusCircle, Trash2Icon } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'

const HeroSection = () => {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state) => state.user)
    // const [quantity, setQuantity] = useState<number | null>(null)
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

    const { items, totalAmount, delivery_fee, total } = useAppSelector((state) => state.cart)

    const getItemKey = (data: any) => `${data._id}-${data.size}`;
    // ---------- Increase Quantity ----------
    const updateCartIncrease = async (data: any) => {
        if (!user) return;
        const key = getItemKey(data);
        const currentQuantity = quantities[key] ?? data.quantity;
        const newQuantity = currentQuantity + 1;
        try {
            const result = await dispatch(updateCartAsync({ userId: user._id, itemId: data._id, size: data.size, quantity: newQuantity }))
            if (updateCartAsync.fulfilled.match(result)) {
                dispatch(increaseQuantity({ _id: data._id, size: data.size }))
            } else {
                console.log(result.payload)
            }
        } catch (error) {
            console.log(error)
        }
    }
    // ---------- Decrease Quantity ----------
    const updateCartDecrease = async (data: any) => {
        if (!user) return;
        const key = getItemKey(data);
        const currentQuantity = quantities[key] ?? data.quantity;
        if (currentQuantity <= 1) return;

        const newQuantity = currentQuantity - 1;
        setQuantities(prev => ({ ...prev, [key]: newQuantity }));
        try {
            const result = await dispatch(updateCartAsync({ userId: user._id, itemId: data._id, size: data.size, quantity: newQuantity }))
            if (updateCartAsync.fulfilled.match(result)) {
                dispatch(decreaseQuantity({ _id: data._id, size: data.size }))
            } else {
                console.log(result.payload)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // ---------- Delete Cart Item by Size ----------
    const delteCartBySize = async (data: any) => {
        try {
            if (!user) return;
            const result = await dispatch(deleteCartBySizeAsync({ userId: user._id, itemId: data._id, size: data.size }))
            if (deleteCartBySizeAsync.fulfilled.match(result)) {
                dispatch(removeFromCart({ _id: data._id, size: data.size }))
                toast.success('Item removed from cart successfully!')
            }
        } catch (error: any) {
            console.log(error)
            toast.error(error.response?.data?.message || error)
        }
    }

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
                        items.map((item, index) => (
                            <div key={index} className='flex gap-2 sm:gap-5 border-t flex-1/2 w-full border-gray-200 sm:px-10 py-5'>
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
                                            <button className='p-2 rounded-md text-gray-50 bg-green-600/90 cursor-pointer' onClick={() => updateCartIncrease(item)}>
                                                <PlusCircle />
                                            </button>
                                            <span className='border border-gray-500 rounded-md px-5 py-1'>
                                                {item.quantity}
                                            </span>
                                            <button
                                                className={`text-gray-50 bg-red-600 p-2 rounded-md cursor-pointer ${item.quantity <= 1 ? 'opacity-30 cursor-not-allowed' : ''
                                                    }`}
                                                disabled={item.quantity <= 1}
                                                onClick={() => updateCartDecrease(item)}
                                            >
                                                <MinusCircleIcon />
                                            </button>
                                        </span>
                                    </span>
                                    <span className='flex justify-between items-center'>
                                        <h6 className='text-green-600'>In Stock</h6>
                                        <span onClick={() => delteCartBySize(item)} className='text-red-600 cursor-pointer bg-gray-300/20 p-2 rounded-xl hover:scale-105 transition-all duration-200'><Trash2Icon /></span>
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
