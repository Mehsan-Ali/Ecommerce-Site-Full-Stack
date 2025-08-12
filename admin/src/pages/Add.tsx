import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useForm } from 'react-hook-form'
import { productSchema, type ProductFormData } from '../types/ProductForm'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { backednUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }: { token: string }) => {
	const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<ProductFormData>({
		resolver: zodResolver(productSchema), defaultValues: {
			image: [],
			sizes: [],
			bestSeller: false,
			date: Date.now(),
		}
	})
	const selectedSizes = watch("sizes");
	const [imagePreview, setImagePreview] = React.useState<string[]>([]);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const filesArray = Array.from(e.target.files);
			setValue("image", filesArray); // Update react-hook-form state

			// Create preview URLs
			const previews = filesArray.map(file => URL.createObjectURL(file));
			setImagePreview(previews);
		}
	};

	const toggleSize = (size: string) => {
		const currentSizes = watch("sizes");
		if (currentSizes.includes(size)) {
			setValue("sizes", currentSizes.filter(s => s !== size));
		} else {
			setValue("sizes", [...currentSizes, size]);
		}
	};
	
	const onSubmit = async (data: ProductFormData) => {
		try {
			const formData = new FormData();

			// Append text fields
			formData.append("name", data.name);
			formData.append("description", data.description);
			formData.append("price", String(data.price));
			formData.append("category", data.category);
			formData.append("subCategory", data.subCategory);
			formData.append("bestSeller", String(data.bestSeller));

			// Append sizes as JSON
			formData.append("sizes", JSON.stringify(data.sizes));

			// Append images
			data.image.forEach((file: File) => {
				formData.append("image", file); // must match multer field name
			});

			const resp = await axios.post(`${backednUrl}/api/product/add`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data"
				}
			});

			const productData = resp.data;
			if (productData.success) {
				toast.success(productData.message);
				reset();
				setImagePreview([]);
			}
			console.log(productData);

		} catch (error: any) {
			console.log(error);
			toast.error(error.response?.data?.message);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='flex flex-col w-full items-start gap-3'>
				<p>Upload Image</p>
				<div className="flex gap-5 pt-2 flex-wrap">
					{/* Show placeholder only if no images */}
					{imagePreview.length === 0 && (
						<label className="cursor-pointer">
							<img
								className="w-24 h-24 object-cover border border-gray-300 rounded-lg"
								src={assets.upload_area}
								alt="Upload area"
							/>
							<input
								type="file"
								multiple
								hidden
								onChange={handleImageChange}
							/>
						</label>
					)}

					{/* Show previews if images exist */}
					{imagePreview.map((src, idx) => (
						<div key={idx} className="relative w-24 h-24">
							<img
								src={src}
								alt={`preview-${idx}`}
								className="w-full h-full object-cover rounded-lg border border-gray-300"
							/>
							{/* Remove Button */}
							<button
								type="button"
								onClick={() => {
									const updatedPreviews = imagePreview.filter((_, i) => i !== idx);
									setImagePreview(updatedPreviews);
									setValue("image", updatedPreviews as any);
								}}
								className="absolute top-1 right-1 bg-black text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-600"
							>
								×
							</button>
						</div>
					))}
				</div>
				{errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}

				{/* ------- Product Text Fields ------- */}
				<div className='flex flex-col gap-2 w-full text-sm md:text-base mt-2 max-w-xl'>

					<div className='flex flex-col gap-1'>
						<label htmlFor="name">Product Name</label>
						<input type="text" {...register("name")} id="name" placeholder='Enter your product title here...' className='border border-gray-300 rounded-md py-2.5 px-2 sm:px-4 focus:outline-gray-200 text-gray-600 outline-amber-100 focus:outline-2 ' />
						{errors.name && <p className='text-red-500 text-sm'>{errors.name?.message}</p>}
					</div>

					<div className='flex flex-col gap-1'>
						<label htmlFor="description">Product Description</label>
						<textarea {...register("description")} rows={4} id="description" placeholder='Enter your product description here...' className='border border-gray-300 rounded-md py-2.5 px-2 sm:px-4 focus:outline-gray-200 focus:outline-2 text-gray-600 outline-amber-100 ' />
						{errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

					</div>

					<div className='flex justify-between flex-wrap md:flex-nowrap gap-2 md:gap-5 sm:mt-2 w-full'>
						<div className='space-y-1 w-full'>
							<p>Product category</p>
							<select  {...register("category")} className='border w-full focus:outline-gray-200 focus:outline-2 rounded-sm border-gray-300 px-2 py-2'>
								<option value="">Select</option>
								<option value="men">Men</option>
								<option value="women">Women</option>
								<option value="kid">kid</option>
							</select>
							{errors.category && <p className="text-red-500 text-sm">{errors.category?.message}</p>}
						</div>
						<div className='space-y-1 w-full'>
							<p>Product category</p>
							<select {...register("subCategory")} className='border w-full focus:outline-gray-200 focus:outline-2 rounded-sm border-gray-300 px-2 py-2'>
								<option value="">Select</option>
								<option value="topwear">Topwear</option>
								<option value="bottomwear">Bottomwear</option>
								<option value="winterwear">Winterwear</option>
							</select>
							{errors.subCategory && <p className="text-red-500 text-sm">{errors.subCategory?.message}</p>}
						</div>
						<div className='space-y-1 w-full'>
							<label htmlFor="productPrice">Product Price</label>
							<input type="number"  {...register("price", { valueAsNumber: true })} id="productPrice" placeholder='0.00' className='border border-gray-300 w-full rounded-md mt-1 py-2 px-2 focus:outline-gray-200 text-gray-600 focus:outline-2' />
							{errors.price && <p className="text-red-500 text-sm">{errors.price?.message}</p>}
						</div>
					</div>

					<div>
						<p>Product Sizes</p>
						<div className='grid grid-cols-5 gap-2 mt-2'>
							{["S", "M", "L", "XL", "XXL"].map(size => (
								<div
									key={size}
									onClick={() => toggleSize(size)}
									className={`p-2 text-center border-none cursor-pointer font-medium border ${selectedSizes.includes(size) ? "bg-black text-white" : "bg-gray-200"
										}`}>
									{size}
								</div>
							))}
						</div>
						{errors.sizes && <p className="text-red-500 text-sm">{errors.sizes.message}</p>}
					</div>

					<div className="flex items-center gap-2 mt-2">
						<input type="checkbox" {...register("bestSeller")} />
						<label>Add to best seller</label>
					</div>
				</div>
				<button type='submit' className='bg-black cursor-pointer text-sm md:text-base text-white py-3 uppercase font-medium max-w-sm w-full'>
					Add Product
				</button>
			</div>
		</form>
	)
}

export default Add