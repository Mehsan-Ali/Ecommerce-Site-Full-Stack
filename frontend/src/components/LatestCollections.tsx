import { useEffect, useState } from 'react'
import { useAppSelector } from '../store/hooks'
import { Title } from './Title'
import { type Product } from '../types/Product'
import { ProductItem } from './ProductItem'

export const LatestCollections = () => {
  const products = useAppSelector(state => state.shop)
  const [latestProducts, setLatestProducts] = useState<Product[]>([])

  useEffect(() => {
    setLatestProducts(products.products.slice(0, 10))
  }, [])

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1='Latest' text2='Collections' />
        <p className='text-gray-500 text-sm w-3/4 sm:w-1/2 mx-auto'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti nisi praesentium ut numquam quis</p>
      </div>

      {/* --------- Rendering Products --------- */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 px-5 sm:px-10'>
        {
          latestProducts.map((product,index) => (
              <ProductItem key={index} {...product} />
          ))
        }
      </div>
    </div>
  )
}