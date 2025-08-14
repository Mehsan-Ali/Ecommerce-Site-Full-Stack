import { useParams } from 'react-router-dom'
import HeroSection from '../components/product/HeroSection'
import { DetailSection } from '../components/product/DetailSection'
import RelatedProducts from '../components/product/RelatedProducts'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../store/hooks'

export const Product = () => {
  const { productId } = useParams()
  const products = useAppSelector(state => state.shop.products)
  const [productData, setProductData] = useState<any>(null)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  useEffect(() => {
    setIsLoading(true)
    const foundProduct = products.find((item: any) => item._id === productId)
    setProductData(foundProduct || null)
    if (foundProduct) {
      const related = products.filter((item) =>
        item._id !== foundProduct._id &&
        item.category === foundProduct.category &&
        item.subCategory === foundProduct.subCategory
      ).slice(0, 5)
      const shuffleData = related.sort(() => Math.random() - 0.5)
      setRelatedProducts(shuffleData.slice(0, 5))
    } else {
      setRelatedProducts([])
    }
    setIsLoading(false)
  }, [productId, products])

  if (isLoading) {
    return (
      <div className='flex justify-center text-gray-400 items-center gap-2'>
        <div className='border-2 size-8 border-gray-400 border-t-transparent rounded-full animate-spin'></div>
        <p>Loading Products...</p>
      </div>
    )
  }
  // if (!productData) {
  //   return (
  //     <div className='flex justify-center text-gray-400 items-center gap-2 h-[50vh]'>
  //       <p>Product not found</p>
  //     </div>
  //   )
  // }
  return (
    <>
      <HeroSection id={productId} />
      <DetailSection />
      <RelatedProducts prodsData={relatedProducts} />
    </>
  )
}

export default Product