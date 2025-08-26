import { DollarSign, Eye, Package, ShoppingCart, TrendingDown, TrendingUp, Users } from 'lucide-react'
import React from 'react'

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
    description: "from last month",
  },
  {
    title: "Total Orders",
    value: "2,350",
    change: "+180.1%",
    trend: "up",
    icon: ShoppingCart,
    description: "from last month",
  },
  {
    title: "Products",
    value: "1,234",
    change: "+19%",
    trend: "up",
    icon: Package,
    description: "active products",
  },
  {
    title: "Customers",
    value: "573",
    change: "+201",
    trend: "up",
    icon: Users,
    description: "new this month",
  },
]

const DashBoard = ({ token }: { token: string }) => {
  return (
    <div>
      <div className='flex flex-col gap-1'>
        <h5 className='text-lg sm:text-2xl font-bold text-gray-900'>Admin Dashboard</h5>
        <p className='text-base sm:text-lg'>Manage your e-commerce store efficiently</p>
      </div>
      {/* ------------- Header Card ------------ */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 my-8 w-full">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <header key={stat.title} className="bg-gray-100 border-gray-200 border p-5 h-full space-y-8 rounded-lg ">
              <section className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="text-base font-thin text-gray-900">{stat.title}</h3>
                <Icon className="h-4 w-4 text-gray-500" />
              </section>
              <div className='flex flex-col items-start justify-end'>
                <div className="text-2xl font-bold text-gray-900 font-sans">{stat.value}</div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-700" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-700" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-700" : "text-red-700"}>{stat.change}</span>
                  <span>{stat.description}</span>
                </div>
              </div>
            </header>
          )
        })}
      </div>
      <div className='flex gap-5 justify-between'>
        {/* ------------- Top Products ------------ */}
        <div className='bg-gray-50 border-gray-200 grow border p-5 h-full space-y-8 rounded-lg'>
          <div className='flex justify-between items-end'>
            <span>
              <h5 className='text-base sm:text-lg font-bold text-gray-900'>Top Products</h5>
              <p className='text-xs sm:text-sm'>Best performing products this month</p>
            </span>
            <button className='flex gap-2 items-center border-2 font-medium border-gray-200 rounded-lg bg-gray-50 shadow-md px-4 py-2 text-sm cursor-pointer'><Eye size={18} /> View All</button>
          </div>
          <div>
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} >
                <div className='grid grid-cols-[1fr_3fr_auto] items-center gap-4 py-2 border-gray-300'>
                  <span className='text-sm text-gray-500 font-medium'>#{index + 1}</span>
                  <span className='text-sm text-gray-600'>
                    <p className='font-medium text-gray-800'>Wireless Headphones</p>
                    <p>1234 sales</p>
                  </span>
                  <span className='text-sm text-gray-500'>Category</span>
                </div>
                <hr className='border-gray-200' />
              </div>
            ))}
          </div>
        </div>

        {/* ------------- Recent Orders ------------ */}
        <div className='bg-gray-100 border-gray-200 grow border p-5 h-full space-y-8 rounded-lg'>
          <div className='flex justify-between items-end'>
            <span>
              <h5 className='text-base sm:text-lg font-bold text-gray-900'>Recent Orders</h5>
              <p className='text-xs sm:text-sm'>You have 5 orders this week.</p>
            </span>
            <button className='flex gap-2 items-center border-2 font-medium border-gray-200 rounded-lg bg-gray-50 shadow-md px-4 py-2 text-sm cursor-pointer'><Eye size={18} /> View All</button>
          </div>
          <div>
            {Array.from({ length: 8 }).map((_, index) => (
              <div>
                <div key={index} className='grid grid-cols-[1fr_3fr_auto] gap-4 py-2 items-center'>
                  <span className='text-sm text-gray-500'><ShoppingCart strokeWidth={1.5} className='size-5' /></span>
                  <span className='text-sm text-gray-600'>
                    <p className='font-medium text-gray-800'>Wireless Headphones</p>
                    <p>1234 sales</p>
                  </span>
                  <span className='text-xs text-gray-500 flex gap-2 items-center'>
                    <p className='font-medium bg-gray-700 text-white px-2 py-1 rounded-lg'>Completed</p>
                    <p className='font-medium text-sm text-gray-900'>$42.25</p>
                  </span>
                </div>
                <hr className='border-gray-200' />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default DashBoard