import { useAppSelector } from '../store/hooks';
import { Link } from 'react-router-dom';
interface ProductItemProps {
    _id: string;
    image: string[];
    name: string;
    price: number;
}
export const ProductItem = (props: ProductItemProps) => {
    const {currency} = useAppSelector(state => state.shop)
    return (
        <Link to={`/product/${props._id}`} className='text-gray-700 cursor-pointer'>
            <div className='overflow-hidden'>
                <img src={props.image[0]} alt="" className='transition-all duration-300 ease-in-out hover:scale-110' />
            </div>
            <p className='pt-3 pb-1 text-sm'>{props.name}</p>
            <p className='font-semibold text-sm'>{currency}{props.price}</p>
        </Link>
    )
}