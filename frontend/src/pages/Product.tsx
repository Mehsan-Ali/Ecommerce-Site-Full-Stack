import { useParams } from 'react-router-dom'
import HeroSection from '../components/product/HeroSection'
import { DetailSection } from '../components/product/DetailSection'
import RelatedProducts from '../components/product/RelatedProducts'
// import { HeroSection } from '../components/product/HeroSection'

export const Product = () => {
  const { productId } = useParams()

  return (
    <>
      <HeroSection />
      <DetailSection />
      <RelatedProducts/>
    </>
  )
}
