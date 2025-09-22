import { ShoppingBag, CreditCard, LogOut } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearUser } from "../store/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Profile() {
    const { user } = useAppSelector((state) => state.user);
    const { orders } = useAppSelector((state) => state.orders);
    const { currency } = useAppSelector((state) => state.shop);
    const ordersData = orders.slice(0,2)
    const navg = useNavigate()
    const dispatch = useAppDispatch()
    const handleLogout = () => {
        localStorage.removeItem('token')
        dispatch(clearUser())
        toast.success('Logged out successfully!')
        navg('/')
    }
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
            <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl">
                {/* Header */}
                <div className="flex flex-col items-center text-center p-6">
                    <img
                        src='https://static.vecteezy.com/system/resources/previews/037/336/395/non_2x/user-profile-flat-illustration-avatar-person-icon-gender-neutral-silhouette-profile-picture-free-vector.jpg'
                        alt={user?.name}
                        className="w-28 h-28 rounded-full border border-gray-300 shadow-md"
                    />
                    <h1 className="mt-4 text-2xl font-semibold text-gray-800">{user?.name}</h1>
                    <p className="text-gray-500">{user?.email}</p>
                </div>

                <hr className="border-gray-200" />

                {/* Orders Section */}
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" /> Recent Orders
                    </h2>
                    <div className="space-y-3">
                        {ordersData.map((order) => (
                            <div key={order._id} className="flex flex-col justify-between gap-2 items-start bg-gray-100 p-4 rounded-xl">
                                <div className="flex w-full">
                                    <p className="font-medium text-gray-800">{order.item}</p>
                                    <p className="text-sm text-gray-500">Order #{order._id} • {new Date(order.date).toDateString()}</p>
                                    <span className="text-sm font-semibold text-gray-700 ml-auto">{order.status}</span>
                                </div>
                                <div className="flex w-full">
                                    {order.items.map((item: any) => (
                                        <div key={item._id} className="text-lg text-gray-700">
                                            <p>{item.title}</p>
                                            <span className="flex gap-5 text-sm">
                                                <p>Quantity: {item.quantity}</p>
                                                <p className="border-gray-400 border-r"></p>
                                                <p>Amount: {currency}{item.itemPrice}</p>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex w-full text-sm">
                                    <p>Payment Method: <span className="text-gray-600">{String(order.paymentMethod) === "COD" ? 'Cash On Delivery' : <CreditCard className="w-4 h-4" />}</span></p>
                                    <p className="ml-auto">Amount: <span className="text-gray-600">{currency}{order.amount}</span></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <hr className="border-gray-200" />

                {/* Actions */}
                <div className="flex justify-center gap-3 p-6">
                    <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 transition-all duration-150 cursor-pointer text-white px-4 py-2 rounded-2xl flex items-center gap-2 shadow   ">
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                    {/* <button className="border px-4 py-2 rounded-2xl flex items-center gap-2 text-gray-700 hover:bg-gray-100">
                        <Edit className="w-4 h-4" /> Edit Profile
                    </button> */}
                </div>
            </div>
        </div>
    );
}