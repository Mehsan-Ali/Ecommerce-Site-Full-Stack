import { Box, CalendarDays, CreditCard, MapPin } from 'lucide-react'
import { Title } from '../components/Title'
import { useAppSelector } from '../store/hooks'

export const Orders = () => {
    const { orders } = useAppSelector((state) => state.orders)
    const { currency } = useAppSelector((state) => state.shop)

    return (
        <div className="py-10 px-5 md:px-10 min-h-screen">
            {/* Page Title */}
            <div className="mb-8 text-xl sm:text-2xl uppercase font-semibold text-gray-800">
                <Title text1="My" text2="Orders" />
            </div>
            {/* Orders List */}
            <div className="flex flex-col space-y-6">
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-gray-50/5 rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
                            {/* Order Header */}
                            <div className="flex flex-wrap justify-between items-start">
                                <div className='flex flex-col gap-2'>
                                    <p className="text-base text-gray-800 font-medium">
                                        Order #<span className="">{order._id}</span>
                                    </p>
                                    <div className='flex gap-3'>
                                        {/* ------------ Order Date ------------ */}
                                        <p className="text-sm flex gap-1 items-center text-gray-800 font-medium">
                                            <CalendarDays size={20} />
                                            <span className='font-normal text-gray-500'>
                                                {new Date(order.date).toDateString()}
                                            </span>
                                        </p>
                                        {/* ------------ Payment Method ------------ */}
                                        <p className="text-sm flex gap-1 text-gray-800 font-medium">
                                            <CreditCard size={20} />
                                            <span className='font-normal text-gray-500 capitalize'>{order.paymentMethod === "COD" ? "Cash on Delivery" : order.paymentMethod}</span>
                                        </p>
                                        <p className="text-sm flex gap-1 text-gray-800 font-medium">
                                            <Box size={20} />
                                            <span className='font-normal text-gray-500'>{order.items.length} Items</span>
                                        </p>
                                    </div>
                                </div>
                                {/* -------------- Order Status ------------ */}
                                <div className="text-right">
                                    <div
                                        className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full ${order.status === "Delivered"
                                            ? "bg-green-100 text-green-700"
                                            : order.status === "Shipped"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        <span className="shrink-0 w-2 h-2 rounded-full bg-current"></span>
                                        {order.status || "Ongoing"}
                                    </div>
                                </div>
                            </div>

                            {/*-------------- Items -------------- */}
                            <div className="grid grid-cols-1 gap-3 items-center">
                                {order.items.map((item: any) => (
                                    <div key={item._id} className="flex p-4 flex-1/2 gap-5 items-center border border-gray-100 bg-gray-50 rounded-lg">
                                        <img
                                            src={item.itemImage}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded-xl border border-gray-200"
                                        />
                                        <div className="flex-1 text-sm">
                                            <p className="font-medium text-base text-gray-800">{item.title}</p>
                                            <div className="flex flex-wrap gap-4 mt-1 text-gray-600 text-xs sm:text-sm">
                                                <p>Size: {item.size}</p>
                                                <p>Qty: {item.quantity}</p>
                                                <p>Category: {item.category}</p>
                                            </div>
                                        </div>
                                        <p className='textlg font-semibold'>{currency}{item.itemPrice}</p>
                                    </div>
                                ))}
                            </div>
                            <hr className='border-gray-400/20' />
                            <div className='flex justify-between'>
                                {/* -------------- Address -------------- */}
                                <div className="pt-2 flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                                    <MapPin size={20} />
                                    <div>
                                        <p className='font-semibold text-base'>{order.address.firstName} {order.address.lastName}</p>
                                        <p>
                                            {order.address.address}, {order.address.city},{" "}
                                            {order.address.state} - {order.address.zipCode}
                                        </p>
                                    </div>
                                </div>
                                {/* -------------- Order Total -------------- */}
                                <div className='text-gray-600 text-sm text-end'>
                                    <p>Total Amount</p>
                                    <p className='font-semibold text-2xl'>{currency}{order.amount}</p>
                                    <p>Payment: {order.payment ? "Paid" : "Pending"}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="w-full text-center py-20">
                        <p className="text-xl text-gray-500">No orders found</p>
                    </div>
                )}
            </div>
        </div>
    )
}
