import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Login } from './components/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DashBoard from './pages/DashBoard'

export const backednUrl = import.meta.env.VITE_BACKEND_URL
const App = () => {
  const [token, setToken] = React.useState(localStorage.getItem('token') || '')
  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])
  return (
    <>
      <ToastContainer />
      {
        token === '' ? <Login seToken={setToken} />
          :
          <>
            <Navbar setToken={setToken} />
            <hr className='border border-gray-100' />
            <div className='flex w-full'>
              <Sidebar />
              <div className='w-[70%] mx-auto ml-[max(3vw,25px)] my-8 text-gray-600 text-base'>
                <Routes>
                  <Route path='/add' element={<Add token={token} />} />
                  <Route path='/list-items' element={<List token={token} />} />
                  <Route path='/orders' element={<Orders token={token} />} />
                  <Route path='/dashboard' element={<DashBoard token={token} />} />
                </Routes>
              </div>
            </div>
          </>
      }

    </>
  )
}

export default App
