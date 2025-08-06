import React, { useState } from 'react'
import { useAppSelector } from '../store/hooks'
import { Title } from '../components/Title'
import { ProductItem } from '../components/ProductItem'

export const Collection = () => {
    const products = useAppSelector((state) => state.shop.products)
    const [filters, setFilters] = useState(false)
    return (
        <div className='flex flex-col sm:flex-row gap1 sm:gap-10 pt-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
            {/* ------------ Filter Options --------------- */}
            <div className='min-w-60 grow'>
                <p className='my-4.5 text-gray-700 flex items-center text-xl cursor-pointer gap-2'>Filters</p>

                <div className='flex flex-col gap-5'>
                    {/* ------------------ Categories ------------------- */}
                    <div className='border border-gray-300 rounded-md p-4'>
                        <p className='uppercase my-2 text-lg'>Categories</p>
                        <form action="" className='flex flex-col gap-1 text-sm text-gray-700'>
                            <div className='flex items-center gap-2'>
                                <input type="checkbox" name="men" id="men" className='w-3' />
                                <label htmlFor="men">Men</label>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input type="checkbox" name="women" id="women" className='w-3' />
                                <label htmlFor="women">Women</label>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input type="checkbox" name="kids" id="kids" className='w-3' />
                                <label htmlFor="kids">Kids</label>
                            </div>
                        </form>
                    </div>

                    {/* ------------------ Type ------------------- */}

                    <div className='border border-gray-300 rounded-md p-4'>
                        <p className='uppercase my-2 text-lg'>TYPE</p>
                        <form action="" className='flex flex-col gap-1 text-gray-700 text-sm'>
                            <div className='flex items-center gap-2'>
                                <input type="checkbox" name="topwear" id="topwear" className='w-3' />
                                <label htmlFor="topwear">Topwear</label>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input type="checkbox" name="bottomwear" id="bottomwear" className='w-3' />
                                <label htmlFor="bottomwear">Bottomwear</label>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input type="checkbox" name="winterwear" id="winterwear" className='w-3' />
                                <label htmlFor="winterwear">winterwear</label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* ------------ All Collections --------------- */}
            <div className='grow'>
                <div className='py-2 text-3xl'>
                    <Title text1='All' text2='Collections' />
                </div>
                {
                    products.length > 0 ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                            {
                                products.map((product) => (
                                    <ProductItem key={product._id} {...product} />
                                ))
                            }
                        </div>
                    ) : (
                        <div className='flex flex-col items-center h-full justify-center'>
                            <p className=' text-gray-500'>No products found</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
