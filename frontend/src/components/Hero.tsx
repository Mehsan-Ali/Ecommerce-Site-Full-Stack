import { assets } from '../assets/assets'
import { useAppSelector } from '../store/hooks'

const Hero = () => {
    const {user} = useAppSelector((state) => state.user)
    return (
        <div className='flex flex-col sm:flex-row border border-gray-400 mx-5 sm:mx-14 md:mx-20 lg:mx-36'>
            {user?.name}
            {/* --------------- Left Side ------------------ */}
            <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
                <div className='font-semibold text-gray-600'>
                    <div className='flex items-center text-xl gap-2'>
                        <p className='w-8 md:w-11 h-[2px] bg-gray-700 ' />
                        <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
                    </div>
                    <h1 className='text-4xl md:text-4xl lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
                    <div className='flex items-center gap-2 text-xl font-semibold'>
                        <p className='font-medium text-sm md:text-base'>SHOP NOW</p>
                        <p className='w-8 md:w-11 h-[2px] bg-gray-700 ' />
                    </div>
                </div>
            </div>
            <img src={assets.hero_img} alt="" className='w-full sm:w-1/2' />
        </div>
    )
}

export default Hero
