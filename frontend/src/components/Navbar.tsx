import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
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
    const [visible, setVisible] = useState(false)
    return (
        <>
            <div className={`flex justify-between items-center py-4 bg-gray-200/10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]`} >
                <Link to={'/'}>
                    <img src={assets.logo} alt="" className='w-36' />
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
                    <img src={assets.search_icon} alt="" className='w-5 cursor-pointer' />
                    <div className='group relative'>
                        <img src={assets.profile_icon} alt="" className='w-5 cursor-pointer' />
                        <div className='group-hover:block hidden dropdown-menu absolute pt-4 right-0 shadow-lg rounded-md'>
                            <div className='flex flex-col gap-2 w-36 py-2 px-5 bg-slate-200 text-gray-500'>
                                <NavLink to='/login' className='hover:text-gray-900'>Login</NavLink>
                                <NavLink to='/cart' className='hover:text-gray-900'>Cart</NavLink>
                                <NavLink to='/orders' className='hover:text-gray-900'>Orders</NavLink>
                                <NavLink to='/place-order' className='hover:text-gray-900'>Place Order</NavLink>
                            </div>
                        </div>
                    </div>
                    <NavLink to='/cart' className='relative'>
                        <img src={assets.cart_icon} alt="" className='w-5 cursor-pointer min-w-5' />
                        <p className='absolute -bottom-1 -right-1.5 text-[8px] bg-black text-white rounded-full w-4 leading-4 text-center aspect-square'>10</p>
                    </NavLink>
                    <img src={assets.menu_icon} alt="" onClick={() => setVisible(!visible)} className='min-w-5 w-5 cursor-pointer  flex md:hidden' />

                    {/* <div className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-40 transition-transform duration-300 ${visible ? 'translate-x-0' : 'translate-x-full'} md:hidden`}> */}
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
