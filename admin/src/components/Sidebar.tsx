import { NavLink } from 'react-router-dom'
import {
  BoxIcon,
  LayoutDashboard,
  PackagePlus,
  ShoppingCartIcon
} from 'lucide-react'

const Sidebar = () => {
  const SideBarNavg = [
    {
      id: 0,
      title: 'Dashboard',
      path: '/dashboard',
      img: <LayoutDashboard />
    },
    {
      id: 1,
      title: 'Add Items',
      path: '/add',
      img: <PackagePlus />
    },
    {
      id: 2,
      title: 'List Items',
      path: '/list-items',
      img: <BoxIcon />
    },
    {
      id: 3,
      title: 'Orders',
      path: '/orders',
      img: <ShoppingCartIcon />
    }
  ]
  return (
    <div className='w-[18%] min-h-screen border-r-2 border-gray-100'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        {SideBarNavg.map(item => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `flex gap-2 items-center justify-center md:justify-start px-4 py-2 border text-gray-500 border-r-0 border-gray-200 ${
                isActive ? 'bg-gray-200' : 'bg-white'
              }`
            }
          >
            {item.img}
            <p className='hidden md:block'>{item.title}</p>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Sidebar