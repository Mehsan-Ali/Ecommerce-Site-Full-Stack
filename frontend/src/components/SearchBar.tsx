import React, { use, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { assets } from '../assets/assets'
import { setSearch, setShowSearch } from '../store/slice/shopSlice'

export const SearchBar = () => {
    const dispatch = useAppDispatch()
    // const products = useAppSelector((state) => state.shop.products)
    const { showSearch } = useAppSelector((state) => state.shop)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        dispatch(setSearch(value))
        e.preventDefault()
    }

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault()
    //     const filteredProducts = products.filter((product) =>
    //         product.name.toLowerCase().includes(search.toLowerCase())
    //     )
    // }

    return (
        showSearch ?
            <div className='mx-0 sm:mx-28 py-4 flex items-center justify-center bg-gray-100 border-b border-gray-300' >
                <div className='w-full sm:flex-10/12 flex items-center justify-center'>
                    <input onChange={handleChange} type="text" name="search" id="search" className='w-10/12 sm:w-1/2 p-2.5 sm:p-3 border border-gray-400 rounded-2xl outline-none placeholder:text-sm' placeholder='Search' />
                    <img src={assets.search_icon} alt="" className='w-4 sm:w-5 -mx-10 cursor-pointer' />
                    <div className='flex items-center'>
                        <img onClick={() => dispatch(setShowSearch(!showSearch))} src={assets.cross_icon} alt="" className='w-3 sm:w-4 ml-20 cursor-pointer' />
                    </div>
                </div>
            </div> : null
    )
}
