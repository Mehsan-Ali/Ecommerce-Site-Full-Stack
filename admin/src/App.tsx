import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'

const App = () => {
  return (
    <div>
        <Routes>
          <Route path='/add' element={<Add/>} />
          <Route path='/list' element={<List/>} />
          <Route path='/orders' element={<Orders/>} />
        </Routes>
    </div>
  )
}

export default App
