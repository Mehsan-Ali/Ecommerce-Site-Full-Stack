import { useParams } from 'react-router-dom'
import HeroSection from '../components/product/HeroSection'
import { DetailSection } from '../components/product/DetailSection'
import RelatedProducts from '../components/product/RelatedProducts'
import { products } from '../assets/assets'
import { useEffect, useState } from 'react'

export const Product = () => {
  const { productId } = useParams()
  const [productData, setProductData] = useState<any>(null)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])

  useEffect(() => {
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
    }
  }, [productId])

  if (!productData) return <div>Loading...</div>

  return (
    <>
      <HeroSection id={productId} />
      <DetailSection />
      <RelatedProducts prodsData={relatedProducts} />
    </>
  )
}

export default Product