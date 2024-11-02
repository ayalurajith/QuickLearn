import Layout from '../components/layout/Layout';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/Auth';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import useCategory from '../hooks/useCategory';

function Home() {
  const categories = useCategory();
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/product/get-product`);
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={'Quick Learn'}>
      <div className='mt-10'>
        <h1 className="text-3xl font-bold text-center mb-6">Welcome to Quick Learn</h1>
        <p className="text-center mb-4">
          Your one-stop destination for mastering PSC exams. Explore a wide range of resources, 
          practice materials, and expert guidance to help you succeed in your studies.
        </p>
        
        <h2 className="text-2xl font-semibold text-center mb-4">Explore and Learn</h2>
        <div className="grid grid-cols-3 gap-4 p-4">
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/category/${category._id}`}
              className="text-center transition-transform transform hover:scale-105"
            >
              <div className="flex flex-col items-center justify-center">
                <div className="h-24 w-24 bg-gradient-to-r from-red-200 to-blue-200 border-2 border-gray-300 shadow-md flex items-center justify-center rounded-lg">
                  <h4 className="text-sm text-black leading-tight text-center">
                    {category.name}
                  </h4>
                </div>
               
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Home;
