import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { client } from '../APIs/client'
import { clearCart } from '../store/slice/cartSlice'

const Verify = () => {
    const dispatch = useAppDispatch()
    const { token } = useAppSelector((state) => state.user)
    const [searchParams, setSearchParams] = useSearchParams()
    const navg = useNavigate()
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")

    const verifyPayment = async () => {
        try {
            if (!token) {
                return null
            }

            const resp = await client.post('/api/order/verifyStripe', { success, orderId }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(resp.data.success) {
                dispatch(clearCart())
                console.log(resp.data)
                navg('/orders')
            } else {
                console.log(resp.data)
                navg('/cart')
            }
        } catch (error) {
            console.log(error)
        }
    }
    console.log(setSearchParams)
    useEffect(() => {
        verifyPayment()
    },[token])
    return (
        <div>

        </div>
    )
}

export default Verify