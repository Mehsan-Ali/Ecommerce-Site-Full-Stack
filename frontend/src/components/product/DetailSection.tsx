import { CircleCheckBig, Recycle, Truck } from 'lucide-react'

const DeatilSection = [
    {
        icon: <CircleCheckBig className='text-gray-700' />,
        title: '100% Original Product',
        description: 'All our products are 100% genuine, sourced from trusted brands and authorized sellers.',
    },
    {
        icon: <Truck className='text-gray-700' />,
        title: 'Cash on Delivery',
        description: 'Pay easily with Cash on Delivery at your doorstep. No online payment needed!',
    },
    {
        icon: <Recycle className='text-gray-700' />,
        title: 'Easy Returns',
        description: 'Not satisfied? You can return or exchange the product within 7 days, hassle-free. Just keep it in its original condition.',
    },
]
export const DetailSection = () => {
    return (
        <div className='flex gap-4 px-2 md:px-10 flex-wrap lg:flex-nowrap'>
            {
                DeatilSection.map((item, index) => (
                    <div key={index} className='p-8 grow space-y-1 mx-auto shadow-md bg-gray-950/10 rounded-2xl'>
                        <div className='flex items-center gap-2 mb-4'>
                            {item.icon}
                            <h4 className='text-xl text-black poppins-semibold'>{item.title}</h4>
                        </div>
                        <p className='text-sm text-gray-400'>{item.description}</p>
                    </div>
                ))
            }
        </div>
    )
}
