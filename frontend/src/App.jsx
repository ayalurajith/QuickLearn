import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

import Home from './pages/home';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateProduct from './pages/Admin/CreateProduct';
import CreateCategory from './pages/Admin/CreateCategory';

import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import CategoryProduct from './pages/CategoryProduct';
import Forget from './pages/Auth/Forget';
import SearchResult from './pages/SearchResults';
function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/category/:id' element={<CategoryProduct />} />
        <Route path='/search' element={<SearchResult />} />


        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forget' element={<Forget />} />
          
          {/* Private Route Wrapper */}
          <Route path='/dashboard' element={<AdminRoute />} >
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/create-category' element={<CreateCategory/>} />
          <Route path='admin/create-product' element={<CreateProduct/>} />
          <Route path='admin/update-product/:id' element={<UpdateProduct/>}/>

          <Route path='admin/products' element={<Products/>} />



          </Route>
   {/* Private Route Wrapper */}
   


          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/policy' element={<Policy />} />
          <Route path='*' element={<Pagenotfound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
