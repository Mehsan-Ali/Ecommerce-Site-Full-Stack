import { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { Frown, Trash2 } from 'lucide-react'
import axios from 'axios'
import { backednUrl } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }: { token: string }) => {
	const [productList, setProductList] = useState([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const fetchProducts = async () => {
		setIsLoading(true)
		try {
			const response = await axios.get(`${backednUrl}/api/product/list`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			const data = response.data
			if (data.success) {
				setProductList(data.allProduct)
				console.log(data.allProduct)
			}
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}
	const removeProductItem = async (id: string) => {
		setIsLoading(true)
		try {
			const response = await axios.post(`${backednUrl}/api/product/remove`, { id }, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			const data = response.data
			if(data.success) {
				await fetchProducts()
				toast.success(data.message)
			}
		} catch (error: any) {
			console.log(error)
			toast.error(error.response?.data?.message)
		} finally {
			setIsLoading(false)
		}
	}
	useEffect(() => {
		fetchProducts()
	}, [])
	return (
		<div className=''>
			<div className='pb-8'>
				<p className='text-2xl font-medium'>Product List</p>
			</div>
			{isLoading && <p>Loading...</p>}
			{productList.length < 1 ?
				<div className='flex justify-center items-center gap-2 text-gray-400 h-[50vh]'>
					<Frown className='mt-1' />
					<p className='text-2xl font-medium text-center'>No product found</p>
				</div>
				:
				<div className='w-full overflow-x-auto'>
					<table className='text-sm min-w-full w-2xl px-10'>
						<thead className='border-y border-gray-200 bg-gray-100'>
							<tr>
								<th scope='col' className='py-3.5 pl-5 text-left text-sm font-semibold text-gray-900'>Image</th>
								<th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'>Name</th>
								<th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'>Category</th>
								<th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'>Price</th>
								<th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'>Action</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-200'>
							{
								productList.map((item: any) => (
									<tr key={item._id}>
										<td className='py-2 pl-4'><img src={item.image[0]} alt="" className='w-20' /></td>
										<td className='py-2'>{item.name}</td>
										<td className='py-2 capitalize'>{item.category}</td>
										<td className='py-2'>${item.price}</td>
										<td className='py-2'><Trash2 color='red' onClick={() => removeProductItem(item._id)} className='cursor-pointer'/></td>
									</tr>

								))
							}
						</tbody>
					</table>
				</div>
			}

		</div>
	)
}

export default List
