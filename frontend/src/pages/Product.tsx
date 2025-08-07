import { useParams } from 'react-router-dom'
import HeroSection from '../components/product/HeroSection'
// import { HeroSection } from '../components/product/HeroSection'

export const Product = () => {
  const { productId } = useParams()

  return (
    <div>
      <HeroSection/>

    </div>
  )
}
