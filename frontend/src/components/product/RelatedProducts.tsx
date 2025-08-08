import React, { useEffect } from 'react'
import { Title } from '../Title'
import { ProductItem } from '../ProductItem'
import { useAppSelector } from '../../store/hooks'
import { type Product } from '../../types/Product'

const RelatedProducts = () => {
    const products = useAppSelector((state) => state.shop.products)
    const [relatedPro, setRelatedPro] = React.useState<Product[]>([])
    useEffect(() => {
        setRelatedPro(products.slice(0, 5))
    }, [])
    return (
        <div className='flex flex-col my-10 justify-center items-center'>
            <span className='text-center py-8 text-2xl sm:text-4xl'>

                <Title text1='Related' text2='Products' />
            </span>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 px-5 sm:px-10'>
                {
                    relatedPro.map((product, index) => (
                        <ProductItem key={index} {...product} />
                    ))
                }
            </div>
        </div>
    )
}

export default RelatedProducts
