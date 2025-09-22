import { Title } from '../components/Title'

export const About = () => {
    return (
        <div>
            <div className='px-5 sm:px-28 py-10'>
                <span className='flex items-center justify-center text-2xl py-5'>
                    <Title text1='About' text2='Us' />
                </span>
                <div className='flex justify-between gap-5 sm:gap-10 lg:flex-nowrap flex-wrap'>
                    <img src="https://foreverbuy.in/assets/about_img-BAJyTXw9.png" alt="" className='lg:max-w-md' />
                    <div className='text-sm text-gray-600 flex justify-center flex-col gap-5'>
                        <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
                        <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
                        <p>Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
                    </div>
                </div>
                {/* ----------- Why choose US ----------- */}
                <div className='py-10'>
                    <div className='text-2xl py-5'>
                        <Title text1='Why' text2='Choose Us' />
                    </div>
                    <div className='flex gap-2 text-gray-600 md:flex-nowrap flex-wrap'>
                        <div className='p-8 border border-gray-300 rounded-sm'>
                            <h4 className='text-black'>Quality Assurance</h4>
                            <p className='text-sm'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
                        </div>
                        <div className='p-8 border border-gray-300 rounded-sm'>
                            <h4  className='text-black'>Convenience</h4>
                            <p className='text-sm'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
                        </div>
                        <div className='p-8 border border-gray-300 rounded-sm space-y-3'>
                            <h4 className='text-black'>Exceptional Customer Service</h4>
                            <p className='text-sm'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
