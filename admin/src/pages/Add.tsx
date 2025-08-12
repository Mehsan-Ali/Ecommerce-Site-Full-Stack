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
			</div>
		</form>
	)
}

export default Add
