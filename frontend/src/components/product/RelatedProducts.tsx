import { Title } from '../Title'
import { ProductItem } from '../ProductItem'
import { type Product } from '../../types/Product'

interface Props {
  prodsData: Product[]
}
const RelatedProducts = ({ prodsData }: Props) => {
    return (
        <div className='flex flex-col my-10 justify-center items-center'>
            <span className='text-center py-8 text-2xl sm:text-4xl'>
                <Title text1='Related' text2='Products' />
            </span>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 px-5 sm:px-10'>
                {
                    prodsData.map((product, index) => (
                        <ProductItem key={index} {...product} />
                    ))
                }
            </div>
        </div>
    )
}

export default RelatedProducts
