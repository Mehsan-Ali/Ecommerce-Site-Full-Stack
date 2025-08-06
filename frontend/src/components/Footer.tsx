import { assets } from '../assets/assets'

export const Footer = () => {
    return (
        <div className='space-y-10 pt-10 sm:pt-20 bg-gray-200/10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
            <div className='flex justify-between items-center gap-5 flex-wrap'>
                <div className='md:w-1/2 space-y-5 md:pb-0 pb-8'>
                    <img src={assets.logo} alt="" className='w-[10rem]' />
                    <p className='text-sm poppins-light text-gray-700 w-10/12'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt velit officia, animi numquam rem ex placeat earum qui debitis rerum provident iure beatae minima exercitationem cum! Laudantium harum ut quidem?</p>
                </div>

                <div className='flex justify-between gap-5 grow flex-wrap'>
                    <div className='flex flex-col space-y-3 grow'>
                        <p className='text-lg poppins-semibold text-black'>COMPANY</p>
                        <ul className='text-gray-700 text-sm space-y-2'>
                            <li>Home</li>
                            <li>About Us</li>
                            <li>Delivery</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>

                    <div className='flex flex-col space-y-3 grow'>
                        <p className='text-lg poppins-semibold text-black'>GET IN TOUCH</p>
                        <ul className='text-gray-700 text-sm space-y-2'>
                            <li>+1-000-000-0000</li>
                            <li>greatstackdev@gmail.com</li>
                            <li>Instagram</li>
                            <li>Facebook</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='text-center text-gray-900 text-xs sm:text-xs md:text-sm space-y-5 pb-5'>
                <hr className='border-gray-300'/>
                <p>Copyright 2025@ mehsan-ali.vercel.app - All Right Reserved.</p>
            </div>
        </div>
    )
}