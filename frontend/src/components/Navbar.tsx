import  { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setShowSearch } from '../store/slice/shopSlice'
import { clearUser } from '../store/slice/userSlice'
import { LogOut, ShoppingBag, User, BoxSelectIcon } from 'lucide-react'
const NavgPage = [
    {
        id: 1,
        name: 'Home',
        path: '/'
    },
    {
        id: 2,
        name: 'Collection',
        path: '/collection'
    },
    {
        id: 3,
        name: 'About',
        path: '/about'
    },
    {
        id: 4,
        name: 'Contact',
        path: '/contact'
    }
]
export const Navbar = () => {
    const { user } = useAppSelector((state) => state.user)
    const cart = useAppSelector((state) => state.cart.totalItems)
    const navg = useNavigate()
    const dispatch = useAppDispatch()
    const { showSearch } = useAppSelector((state) => state.shop)
    const [cartItem, setCartItem] = useState(0)
    const [visible, setVisible] = useState(false)
    const toggleButn = () => {
        navg('/collection')
        dispatch(setShowSearch(!showSearch))
    }
    const handleLogout = () => {
        localStorage.removeItem('token')
        dispatch(clearUser())
        navg('/')
    }

    useEffect(() => {
        setCartItem(cart)
    }, [cart])
    return (
        <>
            <div className={`flex justify-between items-center py-4 bg-gray-200/10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] border-b border-gray-200`} >
                <Link to={'/'} className='flex gap-2 bg-black p-2 text-white rounded-md'>
                    <BoxSelectIcon /> Logo
                </Link>

                <ul className='md:flex gap-10 font-semibold hidden '>
                    {
                        NavgPage.map((item) => (
                            <NavLink to={item.path} key={item.id} className={({ isActive }) => isActive ? 'text-gray-900  flex flex-col items-center border-b-[2px]' : 'text-gray-500 hover:text-gray-900 flex flex-col items-center'}>
                                <li>
                                    <span className='relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-0 font-semibold after:h-[1.5px] after:bg-[#3a3a3a] after:transition-all after:duration-300 hover:after:w-full'>
                                        {item.name}
                                    </span>
                                </li>
                            </NavLink>
                        ))
                    }
                </ul>

                <div className='flex gap-5 items-center'>
                    <img src={assets.search_icon} onClick={toggleButn} alt="" className='w-ssm sm:w-slg cursor-pointer' />
                    <div className='group relative'>
                        <img src={assets.profile_icon} alt="" className='w-ssm sm:w-slg cursor-pointer' />
                        <div className='group-hover:block hidden dropdown-menu absolute pt-4 right-0 shadow-lg rounded-md'>
                            <div className='flex font-medium text-base flex-col gap-3 w-36 py-5 px-5 rounded-md bg-slate-100 text-gray-500'>
                                {
                                    user ? (
                                        <>
                                            <NavLink to='/profile' className='hover:text-gray-900 flex items-center gap-2'>
                                                <User size={20}/>
                                                <p>Profile</p>
                                            </NavLink>

                                            <NavLink to='/orders' className='hover:text-gray-900 flex gap-2 items-center'>
                                                <ShoppingBag size={20}/>
                                                Orders
                                            </NavLink>
                                            <div onClick={handleLogout} className='flex gap-2 items-center'>
                                                <LogOut size={20}/>
                                                <p className='cursor-pointer hover:text-gray-900'>Logout</p>
                                            </div>
                                        </>
                                    ) :
                                        <NavLink to='/login' className='hover:text-gray-900'>Login</NavLink>
                                }
                            </div>
                        </div>
                    </div>
                    <NavLink to='/cart' className='relative'>
                        <img src={assets.cart_icon} alt="" className='w-ssm cursor-pointer sm:w-slg' />
                        <p className='absolute -bottom-1 -right-1.5 text-[11px] bg-black text-white rounded-full w-3 sm:w-4.5 leading-4 flex justify-center items-center aspect-square'>{cartItem}</p>
                    </NavLink>
                    <img src={assets.menu_icon} alt="" onClick={() => setVisible(!visible)} className='min-w-5 w-5 cursor-pointer flex md:hidden' />

                    {/* ---------------------- Mobile Screen --------------------- */}
                    <div className={`fixed top-0 right-0 w-full h-full bg-white transition-all duration-300 ${visible ? 'translate-x-0' : 'translate-x-full'} md:hidden font-bold`}>
                        <div className='flex items-center gap-3 py-5 px-3 cursor-pointer' onClick={() => setVisible(false)}>
                            <img src={assets.dropdown_icon} alt="" className='rotate-180 w-2' />
                            <span>Back</span>
                        </div>
                        <ul className='flex flex-col'>
                            {
                                NavgPage.map((item) => (
                                    <NavLink onClick={() => setVisible(false)} to={item.path} className={({ isActive }) => isActive ?
                                        'bg-black px-6 text-white py-4' : 'px-6 py-4 border-y border-gray-300'}>
                                        <li key={item.id}>{item.name}</li>
                                    </NavLink>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}