import React from 'react'
import { assets } from '../assets/assets'

const Add = ({ token }: { token: string }) => {
	return (
		<form>
			<div className='flex flex-col w-full items-start gap-3'>
				<p>Upoad Image</p>
				<div className='flex gap-5 pt-2'>
					<label htmlFor="image1">
						<img className='w-25' src={assets.upload_area} alt="" />
						<input type="file" name="image1" id="image1" hidden />
					</label>
					<label htmlFor="image2">
						<img className='w-25' src={assets.upload_area} alt="" />
						<input type="file" name="image2" id="image2" hidden />
					</label>
					<label htmlFor="image3">
						<img className='w-25' src={assets.upload_area} alt="" />
						<input type="file" name="image3" id="image3" hidden />
					</label>
					<label htmlFor="image4">
						<img className='w-25' src={assets.upload_area} alt="" />
						<input type="file" name="image4" id="image4" hidden />
					</label>
				</div>
				{/* ------- Product Text Fields ------- */}
				<div className='flex flex-col gap-2 w-full mt-2 max-w-xl'>

					<div className='flex flex-col gap-1'>
						<label htmlFor="title">Product Name</label>
						<input type="text" name="title" id="title" placeholder='Enter your product title here...' className='border border-gray-400 rounded-md py-2.5 px-2 sm:px-4 focus:outline-gray-200 text-gray-600 outline-amber-100 ' />
					</div>

					<div className='flex flex-col gap-1'>
						<label htmlFor="description">Product Description</label>
						<textarea name="description" rows={4} id="description" placeholder='Enter your product description here...' className='border border-gray-400 rounded-md py-2.5 px-2 sm:px-4 focus:outline-gray-200 text-gray-600 outline-amber-100 ' />
					</div>

					<div className='flex justify-between gap-5 mt-2 w-full'>
						<div className='space-y-1 w-full'>
							<p>Product category</p>
							<select className='border w-full focus:outline-gray-200 focus:outline-2 rounded-sm border-gray-300 px-2 py-2'>
								<option value="men">Men</option>
								<option value="women">Women</option>
								<option value="kid">kid</option>
							</select>
						</div>
						<div className='space-y-1 w-full'>
							<p>Product category</p>
							<select className='border w-full focus:outline-gray-200 focus:outline-2 rounded-sm border-gray-300 px-2 py-2'>
								<option value="men">Men</option>
								<option value="women">Women</option>
								<option value="kid">kid</option>
							</select>
						</div>
						<div className='space-y-1 w-full'>
							<p>Product category</p>
							<select className='border w-full focus:outline-gray-200 focus:outline-2 rounded-sm border-gray-300 px-2 py-2'>
								<option value="men">Men</option>
								<option value="women">Women</option>
								<option value="kid">kid</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</form>
	)
}

export default Add
