import { Title } from '../components/Title'
import { useAppSelector } from '../store/hooks'

export const Orders = () => {
    const { orders } = useAppSelector((state) => state.orders)
    const { currency } = useAppSelector((state) => state.shop)

    return (
        <div className="py-10 px-5 md:px-20 min-h-screen">
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
                            className="bg-gray-50/50 rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5"
                        >
                            {/* Order Header */}
                            <div className="flex flex-wrap justify-between items-start">
                                <div>
                                    <p className="text-sm text-gray-800 font-medium">
                                        Order ID: <span className="font-normal text-gray-500">{order._id}</span>
                                    </p>
                                    <p className="text-sm text-gray-800 font-medium">
                                        Date: <span className='font-normal text-gray-500'>
                                            {new Date(order.date).toDateString()}
                                            {/* {new Date(order.date).toLocaleDateString("en-GB", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric"
                                            }).replace(/(\d{1,2}) (\w{3}) (\d{4})/, "$1, $2, $3")} */}
                                        </span>
                                    </p>
                                    <p className="text-sm text-gray-800 font-medium">
                                        Payment: <span className='font-normal text-gray-500 capitalize'>{order.paymentMethod === "COD" ? "Cash on Delivery" : order.paymentMethod}</span>
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-semibold text-gray-800">
                                        {currency}{order.amount}
                                    </p>
                                    <span
                                        className={`inline-flex items-center gap-2 px-3 py-1 mt-2 text-xs font-medium rounded-full ${order.status === "Delivered"
                                            ? "bg-green-100 text-green-700"
                                            : order.status === "Shipped"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        <span className="w-2 h-2 rounded-full bg-current"></span>
                                        {order.status || "Ongoing"}
                                    </span>
                                </div>
                            </div>

                            {/* Items */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
                                {order.items.map((item: any) => (
                                    <div key={item._id} className="flex px-4 flex-1/2 gap-5 py-4 items-center border border-gray-300 rounded-md">
                                        <img
                                            src={item.itemImage}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded-xl border border-gray-200"
                                        />
                                        <div className="flex-1 text-sm">
                                            <p className="font-medium text-gray-800">{item.title}</p>
                                            <div className="flex flex-wrap gap-4 mt-1 text-gray-600 text-xs sm:text-sm">
                                                <p>{currency}{item.itemPrice}</p>
                                                <p>Qty: {item.quantity}</p>
                                                <p>Size: {item.size}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Address */}
                            <div className="pt-2 text-xs sm:text-sm text-gray-600">
                                <p className="font-medium text-gray-700 mb-1">Shipping Address:</p>
                                <p>
                                    {order.address.address}, {order.address.city},{" "}
                                    {order.address.state} - {order.address.zipCode},{" "}
                                    {order.address.country} - {order.address.phoneNumber}
                                </p>
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
