import {
  DollarSign,
  Package,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Users
} from 'lucide-react'
import TopProducts from './Sections/TopProducts'
import RececntOrders from './Sections/RececntOrders'

const stats = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    trend: 'up',
    icon: DollarSign,
    description: 'from last month'
  },
  {
    title: 'Total Orders',
    value: '2,350',
    change: '+180.1%',
    trend: 'up',
    icon: ShoppingCart,
    description: 'from last month'
  },
  {
    title: 'Products',
    value: '1,234',
    change: '+19%',
    trend: 'up',
    icon: Package,
    description: 'active products'
  },
  {
    title: 'Customers',
    value: '573',
    change: '+201',
    trend: 'up',
    icon: Users,
    description: 'new this month'
  }
]

const DashBoard = ({ token }: { token: string }) => {
  return (
    <div>
      <div className='flex flex-col gap-1'>
        <h5 className='text-lg sm:text-2xl font-bold text-gray-900'>
          Admin Dashboard
        </h5>
        <p className='text-base sm:text-lg'>
          Manage your e-commerce store efficiently
        </p>
      </div>
      {/* ------------- Header Card ------------ */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 my-8 w-full'>
        {stats.map(stat => {
          const Icon = stat.icon
          return (
            <header
              key={stat.title}
              className='bg-gray-100 border-gray-200 border p-5 h-full space-y-8 rounded-lg '
            >
              <section className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <h3 className='text-base font-thin text-gray-900'>
                  {stat.title}
                </h3>
                <Icon className='size-4 text-gray-500' />
              </section>
              <div className='flex flex-col items-start justify-end'>
                <div className='text-2xl font-bold text-gray-900 font-sans'>
                  {stat.value}
                </div>
                <div className='flex items-center space-x-2 text-xs text-gray-500'>
                  {stat.trend === 'up' ? (
                    <TrendingUp className='size-3 text-green-700' />
                  ) : (
                    <TrendingDown className='size-3 text-red-700' />
                  )}
                  <span
                    className={
                      stat.trend === 'up' ? 'text-green-700' : 'text-red-700'
                    }
                  >
                    {stat.change}
                  </span>
                  <span>{stat.description}</span>
                </div>
              </div>
            </header>
          )
        })}
      </div>
      <div className='flex gap-5 justify-between'>
        {/* ------------- Top Products ------------ */}
        <TopProducts />

        {/* ------------- Recent Orders ------------ */}
        <RececntOrders token={token} />
      </div>
    </div>
  )
}

export default DashBoard
