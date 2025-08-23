import { BoxSelectIcon } from 'lucide-react'
import { assets } from '../assets/assets'

const Navbar = ({ setToken }: any) => {
    return (
        <div className='flex justify-between items-center py-3 px-[5%]'>
            {/* <img className='w-[max(10%,80px)]' src={assets.logo} alt="" /> */}
            <div className='flex gap-2 text-xl items-center font-bold'>
                <div className='p-2 text-white bg-sky-950 rounded-md'>
                    <BoxSelectIcon />
                </div>
                <p>Admin</p>
            </div>
            <button onClick={() => setToken('')} className='bg-gray-500 cursor-pointer py-2 px-4 rounded-2xl text-white font-medium' >Logout</button>
        </div>
    )
}

export default Navbar
