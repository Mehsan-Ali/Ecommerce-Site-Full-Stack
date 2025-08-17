import axios from "axios"
import React, { useCallback, useEffect, useState } from "react"
import { backednUrl } from "../App"

const Orders = ({ token }: { token: string }) => {
	const [orderList, setOrderList] = useState<any[]>([])

	const fetchOrders = useCallback(async () => {
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
		}
	}, [token])

	useEffect(() => {
		fetchOrders()
	}, [fetchOrders])

	return (
		<div className="">
			<h2 className="text-2xl font-bold mb-4">All Orders</h2>

			{orderList.length === 0 ? (
				<p className="text-gray-600">No orders found</p>
			) : (
				<div className="space-y-6">
					{orderList.map((order) => (
						<div
							key={order._id}
							className="border border-gray-300 rounded-2xl shadow-md p-6 bg-white">
							{/* Order Header */}
							<div className="flex justify-between flex-wrap gap-2 items-center mb-4">
								<h3 className="font-semibold text-base md:text-lg">
									Order ID:{" "}
									<span className="text-gray-700 font-normal">
										{order._id}
									</span>
								</h3>
								<select value={order.status} className="px-3 py-2 text-sm rounded-sm bg-blue-50 text-blue-700 outline-none">
									{/* {order.status} */}
									<option value={order.status}>Order Placed</option>
									<option value="Processing">Processig</option>
									<option value="Shipped">Shipped</option>
									<option value="Out For Delivery">Out For Delivery</option>
									<option value="Delivered">Delivered</option>
								</select>
							</div>

							{/* Items */}
							<div className="mb-4">
								<h4 className="font-medium text-gray-800 mb-2">Items:</h4>
								<ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
									{order.items.map((item: any, idx: number) => (
										<li
											key={idx}
											className="flex w-full p-2 rounded-md items-center gap-4 border border-gray-300 ">
											<img
												src={item.itemImage}
												alt={item.title}
												className="w-16 h-16 object-cover rounded"
											/>
											<div>
												<p className="font-medium">{item.title}</p>
												<p className="text-sm text-gray-600">
													Size: {item.size} | Qty: {item.quantity}
												</p>
												<p className="text-sm font-semibold">
													${item.itemPrice}
												</p>
											</div>
										</li>
									))}
								</ul>
							</div>

							{/* Order Summary */}
							<div className="mb-4">
								<h4 className="font-medium text-gray-800 mb-2">Order Info:</h4>
								<p>
									<span className="font-semibold">Amount:</span> $
									{order.amount}
								</p>
								<p>
									<span className="font-semibold">Payment:</span>{" "}
									{order.paymentMethod}{" "}
									{order.payment ? "(Paid)" : "(Not Paid)"}
								</p>
								<p>
									<span className="font-semibold">Date:</span>{" "}
									{new Date(order.date).toLocaleString()}
								</p>
							</div>

							{/* Address */}
							<div>
								<h4 className="font-medium text-gray-800 mb-2">Shipping Address:</h4>
								<p className="font-semibold">
									Name: <span className="text-gray-600 font-normal">{order.address.firstName} {order.address.lastName}</span>
								</p>
								<p className="font-semibold">
									Address: <span className="text-gray-600 font-normal">{order.address.address}</span>
								</p>
								<p className="font-semibold">
									City: <span className="text-gray-600 font-normal">{order.address.city}</span>,  State: <span className="text-gray-600 font-normal">{order.address.state}</span>
								</p>
								<p></p>
								<p className="font-semibold">
									Country:
									<span className="font-normal text-gray-600">
										{order.address.country}
									</span>
								</p>
								<p className="font-semibold">
									Zip Code: <span className="text-gray-600 font-normal">{order.address.zipCode}</span>
								</p>
								<p className="font-semibold">Phone: <span className="font-normal text-gray-600">{order.address.phoneNumber}</span> </p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default Orders
