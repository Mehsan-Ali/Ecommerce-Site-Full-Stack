import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import { Collection } from './pages/Collection'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Product } from './pages/Product'
import { Cart } from './pages/Cart'
import { Login } from './pages/Login'
import { PlaceOrder } from './pages/PlaceOrder'
import { Orders } from './pages/Orders'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Signup } from './pages/Signup'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { useEffect } from 'react'
import { fetchProducts } from './store/slice/shopSlice'
import { client } from './APIs/client'
import { setUser } from './store/slice/userSlice'

function App() {
  const dispatch = useAppDispatch()
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token')
      const resp = await client.get('/api/user/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      dispatch(setUser(resp.data))
      console.log(resp.data)
    } catch (error: any) {
      console.log(error.message)
    }
  }
  
  useEffect(() => {
    dispatch(fetchProducts())
    fetchUser()
  }, [dispatch, fetchUser])

  const RedirectAuthenticatedUser = ({ children }: any) => {
    const { user } = useAppSelector((state) => state.user)
    if (user) {
      return <Navigate to='/' replace />
    }
    return children
  }
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />

        {/* --------- Login ----------- */}
        <Route path='/login' element={
          <RedirectAuthenticatedUser>
            <Login />
          </RedirectAuthenticatedUser>
        } />

        {/* --------- Signup ----------- */}
        <Route path='/signup' element={
          <RedirectAuthenticatedUser>
            <Signup />
          </RedirectAuthenticatedUser>
        } />

        <Route path='*' element={<Navigate to='/' replace />} />

      </Routes>
      <Footer />
    </>
  )
}

export default App
