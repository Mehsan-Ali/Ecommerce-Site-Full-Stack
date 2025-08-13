import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../store/hooks'
import type { Product } from '../types/Product'
import { Title } from './Title'
import { ProductItem } from './ProductItem'

export const BestSeller = () => {
    const products = useAppSelector((state) => state.shop.products)
    const [bestProducts, setBestProducts] = useState<Product[]>([])
    console.log(products)
    useEffect(() => {
        const bestProduct = products.filter((item) => item.bestSeller).slice(0,5)
        setBestProducts(bestProduct)
    }, [products])

    console.log(bestProducts)

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1='Best' text2='Seller' />
                <p className='w-3/4 sm:w-1/2 mx-auto text-center text-gray-500 text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui culpa repellendus, suscipit a numquam cum dolor doloribus optio officiis.</p>
            </div>

            {/* --------- Rendering Best Seller Products --------- */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 px-5 sm:px-10'>
                {
                    bestProducts.map((product, index) => (
                        <ProductItem key={index} {...product} />
                    ))
                }
            </div>
        </div>
    )
}
