import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { backednUrl } from "../App"
import { toast } from "react-toastify"
import { BoxIcon, Calendar, Wallet } from "lucide-react"

const Orders = ({ token }: { token: string }) => {
	const [orderList, setOrderList] = useState<any[]>([])
	const [status, setStatus] = useState<string>("")
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const fetchOrders = useCallback(async () => {
		setIsLoading(true)
		try {
			const resp = await axios.get(`${backednUrl}/api/order/list`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			const data = resp.data
			if (data.success) {
				setOrderList(data.allOrders)
			}
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}, [token])
	console.log(status)
	const updateOrderStatus = async (orderId: string, e: React.FormEvent) => {
		setIsLoading(true)
		e.preventDefault()
		try {
			const resp = await axios.patch(`${backednUrl}/api/order/status`, { orderId, status }, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			const data = resp.data
			if (data.success) {
				await fetchOrders()
				toast.success(data.message)
				console.log(data)
			}
			console.log(data)
		} catch (error: any) {
			toast.error(error.response?.data?.message)
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}
	useEffect(() => {
		fetchOrders()
	}, [fetchOrders])
	const totalRevenue = orderList.reduce((total, order) => total + order.amount,0)
	const totalPaidOrders = orderList.filter((order)=> order.payment).length
	return (
		<div className="">
			<h2 className="text-2xl font-bold mb-4">All Orders</h2>
			<div className="grid grid-cols-1 my-8 sm:grid-cols-2 md:grid-cols-3 gap-4">
				<div className="flex justify-between items-center bg-gray-50/5 rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 h-28 sm:h-36">
					<span className="">
						<p className="text-base sm:text-lg text-gray-500 font-bold">Total Orders</p>
						<p className="text-2xl sm:text-3xl text-gray-950 font-bold">{orderList.length}</p>
					</span>
					<BoxIcon className="size-10 sm:size-12 text-blue-800" />
				</div>
				<div className="flex justify-between items-center bg-gray-50/5 rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 h-28 sm:h-36">
					<span>
						<p className="text-base sm:text-lg text-gray-500 font-bold">Total Revenue</p>
						<p className="text-2xl sm:text-3xl text-gray-950 font-bold">${totalRevenue}</p>
					</span>
					<Wallet className="size-10 sm:size-12 text-green-800" />
				</div>
				<div className="flex justify-between items-center bg-gray-50/5 rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 h-28 sm:h-36">
					<span>
						<p className="text-base sm:text-lg text-gray-500 font-bold">Paid Orders</p>
						<p className="text-2xl sm:text-3xl text-gray-950 font-bold">{totalPaidOrders}</p>
					</span>
					<Calendar className="size-10 sm:size-12 text-sky-800" />
				</div>
			</div>
			{orderList.length === 0 ? (
				<p className="text-gray-600">No orders found</p>
			) : (
				<div className="space-y-6">
					{orderList.map((order) => (
						<div
							key={order._id}
							className="border border-gray-300 rounded-2xl space-y-3 shadow-md p-4 sm:p-8 bg-white">
							{/* Order Header */}
							<div className="flex gap-5 flex-wrap">
								<p className="font-semibold text-base sm:text-lg text-gray-800">Order #{order._id}</p>
								<p className={`px-4 py-1 rounded-md text-xs sm:text-sm font-medium ${order.status === 'Order Placed' && 'bg-black/10 text-slate-900'} ${order.status === 'Processing' && 'bg-yellow-200 text-yellow-900'} ${order.status === 'Shipped' && 'bg-blue-200 text-blue-900'} ${order.status === 'Delivered' && 'bg-green-200 text-green-800'} }`}>{order.status}</p>
								<p className={`px-4 py-1 rounded-md text-xs sm:text-sm font-medium ${order.payment ? 'bg-slate-950 text-white' : 'bg-slate-200 text-gray-900'}`}>{order.payment ? "Paid" : "Unpaid"}</p>
							</div>
							{/* ---------- Customer Details ------------ */}
							<div className="flex gap-2 justify-between font-semibold text-[13px] sm:text-sm flex-wrap">
								<div>
									<p>Customer Name: <span className="text-gray-500 font-normal">{order.address.firstName} {order.address.lastName}</span></p>
									<p>Email: <span className="text-gray-500 font-normal">{order.address.email}</span> </p>
									<p>Phone: <span className="text-gray-500 font-normal">{order.address.phoneNumber}</span></p>
								</div>
								<div>
									<p>Date: <span className="text-gray-500 font-normal">{new Date(order.date).toDateString()}</span></p>
									<p>Payment: <span className="text-gray-500 font-normal">{order.paymentMethod}</span> </p>
									<p>Items: <span className="text-gray-500 font-normal">{order.items.length} item(s)</span></p>
								</div>
								<div className="text-end flex gap-5 w-full sm:w-auto items-center">
									<div>
										<p className="text-gray-900 text-xl sm:text-3xl font-bold">${order.amount}</p>
										<p>Total Amount</p>
									</div>
									<form onSubmit={(e) => updateOrderStatus(order._id, e)} className="flex flex-col items-start gap-2 ml-auto">
										<select
											defaultValue={order.status}
											onChange={(e) => setStatus(e.target.value)}
											className="px-4 py-2 text-sm sm:text-base rounded-lg bg-white/70 backdrop-blur-md border border-blue-200 text-blue-700 font-medium shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300">
											<option value="Order Placed">Order Placed</option>
											<option value="Processing">Processing</option>
											<option value="Shipped">Shipped</option>
											{/* <option value="Out For Delivery">Out For Delivery</option> */}
											<option value="Delivered">Delivered</option>
										</select>
										<button type="submit" disabled={isLoading} className={`bg-black text-white w-full py-2 text-sm font-semibold rounded-lg cursor-pointer ${isLoading && 'opacity-50 cursor-not-allowed'} `}>
											Update Status
										</button>
									</form>
								</div>
							</div>
							<hr className="border-gray-300" />
							{/* -------------- Items -------------- */}

							<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
								{order.items.map((item: any) => (
									<div key={item._id} className="flex gap-5 items-center border border-gray-200 bg-gray-50 p-2 rounded-md">
										<img
											className="w-16 h-16 object-cover rounded-md"
											src={item.itemImage}
											alt={item.title}
										/>
										<div>
											<p className="text-gray-800 text-sm font-semibold">{item.title}</p>
											<div className="flex gap-1 text-xs text-gray-900 font-semibold">
												<p className="text-gray-600">{item.quantity}x</p>
												<p className="text-gray-600">${item.itemPrice}</p>
												<p className="text-gray-600">{item.size}</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default Orders