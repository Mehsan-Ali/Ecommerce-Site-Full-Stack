import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const SideBarNavg = [
    {
      id: 1,
      title: 'Add Items',
      path: '/add',
      img: assets.add_icon
    },
    {
      id: 2,
      title: 'List Items',
      path: '/list-items',
      img: assets.order_icon
    },
    {
      id: 3,
      title: 'Orders',
      path: '/orders',
      img: assets.parcel_icon
    },
  ]
  return (
    <div className='w-[20%] min-h-screen border-r-2 border-gray-100'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        {
          SideBarNavg.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `flex gap-2 items-center justify-center md:justify-start px-4 py-2 border text-gray-500 border-r-0 border-gray-200 ${isActive ? 'bg-gray-200' : 'bg-white'}`}>
            <img src={item.img} alt={item.title} className='w-[15px] md:w-[20px]' />
            <p className='hidden md:block'>{item.title}</p>
          </NavLink>
          ))
        }
      </div>
    </div>
  )
}

export default Sidebar
