import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Categories from './pages/Categories'
import CategoryProducts from './pages/CategoryProducts'

import ScrollToTop from './components/ScrollToTop'
import ProtectedRoute from './client/components/ProtectedRoute'

import Product from './pages/Product'
import AR from './pages/AR'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Checkout from './pages/Checkout'
import Home from './pages/Home'
import Sales from './pages/Sales'

import Orders from './client/pages/Orders'
import Products from './client/pages/Products'
import ClientLogin from './client/pages/Login'
import Register from './client/pages/Register'
import ClientDashboard from './client/pages/Home'
import AddProduct from './client/pages/AddProduct'
import Menu from './client/pages/Menu'
import RestaurantDetails from './client/pages/RestaurantDetails'
import Profile from './client/pages/Profile'
import EditProduct from './client/pages/EditProduct'
import CreateRestaurant from './client/pages/CreateRestaurant'

const App = () => {
  return (
    <div>
      <ScrollToTop />
      <Toaster position="top-center" />
      <Routes>
        {/* Customer Pages */}
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/restaurant/:restaurantId/categories' element={<Categories />} />
        <Route path='/category/:category' element={<CategoryProducts />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/product/ar/:id' element={<AR />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/payment' element={<>Hello</>} />
        <Route path='/' element={<Sales />} />

        {/* Client Pages */}
        <Route path='/client/login' element={<ClientLogin />} />
        <Route path='/client/register' element={<Register />} />
        
        {/* Protected Client Routes */}
        <Route path='/client/dashboard' element={
          <ProtectedRoute>
            <ClientDashboard />
          </ProtectedRoute>
        } />
        <Route path='/client/orders' element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        } />
        <Route path='/client/products' element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        } />
        <Route path='/client/add-products' element={
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        } />
        <Route path='/client/menu' element={
          <ProtectedRoute>
            <Menu />
          </ProtectedRoute>
        } />
        <Route path='/client/restaurant-details' element={
          <ProtectedRoute>
            <RestaurantDetails />
          </ProtectedRoute>
        } />
        <Route path='/client/profile' element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path='/client/edit-product/:id' element={
          <ProtectedRoute>
            <EditProduct />
          </ProtectedRoute>
        } />
        <Route path='/client/create-restaurant' element={<ProtectedRoute><CreateRestaurant /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App