import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu'; // Corrected import casing
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    Question: '',
    opt1: '',
    opt2: '',
    opt3: '',
    answer: '',
    
    category: '',
  });

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong in getting categories');
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Create product
  const handleCreate = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!product.Question || !product.answer || !product.opt1 || !product.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_APP_BACKEND}/api/v1/product/create-product`, product);
      if (data?.success) {
        toast.success(data?.message);
        setTimeout(() => {
          navigate("/dashboard/admin/products");
        }, 1000); 
      } else {
        toast.error(data?.message || 'Product creation failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while creating the product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container mx-auto py-6 px-4 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 mb-6 md:mb-0">
            <AdminMenu />
          </div>
          <div className="md:w-3/4">
            <h1 className="text-3xl font-bold mb-6">Create Question</h1>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={product.category}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <input
                  type="text"
                  name="Question"
                  value={product.Question}
                  placeholder="Enter Question"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="opt1"
                  value={product.opt1}
                  placeholder="enter option 1"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="opt2"
                  value={product.opt2}
                  placeholder="enter option 2"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>  <div>
                <input
                  type="text"
                  name="opt3"
                  value={product.opt3}
                  placeholder="enter option 3"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>  <div>
                <input
                  type="text"
                  name="answer"
                  value={product.answer}
                  placeholder="enter answer"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div> 

           

           

              <div>
                <button
                  className={`w-full py-2 ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white rounded-lg hover:bg-blue-700 transition duration-300`}
                  onClick={handleCreate}
                  disabled={loading} // Disable button during loading
                >
                  {loading ? 'Creating...' : 'CREATE Question'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
