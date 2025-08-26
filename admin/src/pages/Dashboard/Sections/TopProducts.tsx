import { Eye } from 'lucide-react'
import React from 'react'

const TopProducts = () => {
    return (
        <div className='grow'>
            <div className='bg-[#f1f5f9] border-gray-200 border p-5 h-full space-y-8 rounded-lg'>
                <div className='flex justify-between items-end'>
                    <span>
                        <h5 className='text-base sm:text-lg font-bold text-gray-900'>Top Products</h5>
                        <p className='text-xs sm:text-sm'>Best performing products this month</p>
                    </span>
                    <button className='flex gap-2 items-center border-2 font-medium border-gray-200 rounded-lg bg-gray-50 shadow-md px-4 py-2 text-sm cursor-pointer'><Eye size={18} /> View All</button>
                </div>
                <div>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} >
                            <div className='grid grid-cols-[1fr_3fr_auto] items-center gap-4 py-2 border-gray-300'>
                                <span className='text-sm text-gray-500 font-medium'>#{index + 1}</span>
                                <span className='text-sm text-gray-600'>
                                    <p className='font-medium text-gray-800'>Wireless Headphones</p>
                                    <p>1234 sales</p>
                                </span>
                                <span className='text-sm text-gray-500'>
                                    <p className='font-medium text-gray-800'>$24,680</p>
                                </span>
                            </div>
                            <hr className='border-gray-300' />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TopProducts
