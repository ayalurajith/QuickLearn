import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { Link, useParams } from 'react-router-dom';
import AdminMenu from '../../components/layout/AdminMenu.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';
import useCategory from '../../hooks/useCategory.jsx';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewingCategory, setViewingCategory] = useState(false); // State to toggle between category and product view
  const categories = useCategory();
  const { id } = useParams();

  // Fetch all products (unused here)
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/product/get-product`);
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
      setLoading(false);
    }
  };

  // Fetch products by category
  const getProductByCat = async (categoryId) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/product/product-category/${categoryId}`);
      setProducts(data.products);
      setViewingCategory(true); // Switch to product view
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  // Return to category view
  const handleBackToCategories = () => {
    setViewingCategory(false);
    setProducts([]);
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4">
          <AdminMenu />
        </div>
        <div className="w-full md:w-3/4">
          <h1 className="text-center text-2xl font-bold mb-6">{viewingCategory ? "Questions" : "Categories"}</h1>

          {loading ? (
            <div className="flex justify-center items-center min-h-screen">
              <div className="w-16 h-16 border-t-4 border-l-4 border-red-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {viewingCategory ? (
                <div>
                  <button
                    className="mb-4 p-2 bg-blue-500 text-white rounded"
                    onClick={handleBackToCategories}
                  >
                    Back to Categories
                  </button>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((p) => (
                      <div key={p._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <Link to={`/dashboard/admin/update-product/${p._id}`}>
                        
                          <div className="p-4">
                            <h5 className="text-lg font-semibold mb-2">question : {p.Question}</h5>
                            <p className="text-gray-600">1 :{p.opt1}</p>
                            <p className="text-gray-600">2 :{p.opt2}</p>
                            <p className="text-gray-600">3 :{p.opt3}</p>
                            <p className="text-gray-600">Answer : {p.answer}</p>
                           
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
                  {categories.map((category) => (
                    <div key={category._id} onClick={() => getProductByCat(category._id)}>
                      <Link
                        to="#"
                        className="text-center transition-transform transform hover:scale-105 cursor-pointer"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <div className="h-20 w-20 border-2 border-gray-300 shadow-md flex items-center justify-center">
                            <h4 className="text-sm text-black leading-tight text-center">
                              {category.name}
                            </h4>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
