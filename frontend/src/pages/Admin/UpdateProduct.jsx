import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Fix destructuring here
  
  const [productData, setProductData] = useState({
    
  });

  const [categories, setCategories] = useState([]);

  // Get single product
  const getSingleProduct = async () => {
    try {
      const  res  = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND}/api/v1/product/getone-product/${id}`
      );
      setProductData({ ...res.data }); // Correct destructuring
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching the Question details");
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Update product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {


      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND}/api/v1/product/update-product/${id}`, // Use the id from the URL
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Question Updated Successfully");
        setTimeout(() => {
          navigate("/dashboard/admin/products");
        }, 1000);      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating the Question");
    }
  };

  // Delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are you sure you want to delete this Question?");
      if (!answer) return;
      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_BACKEND}/api/v1/product/delete-product/${id}` // Use the id from the URL
      );
      toast.success("Question Deleted Successfully");
      setTimeout(() => {
      navigate("/dashboard/admin/products");
    }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting the Question");
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  return (
    <Layout title={"Dashboard - Update Question"}>
                  <AdminMenu />

      <div className="container mx-auto my-8">
        <div className="flex justify-center">
         
          <div className="w-3/4">
            <h1 className="text-2xl font-bold mb-6">Update Question</h1>
            <div className="space-y-4 w-full">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                <select
                  name="category"
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  onChange={(e) => setProductData({ ...productData, category: e.target.value })}
                  value={productData.category}
                >
                  <option value="">Select a category</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Question</label>
                <textarea
                  type="text"
                  name="question"
                  value={productData.Question}
                  placeholder="Enter Question  "
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  onChange={handleInputChange}
                />
              </div>
           


              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">option 1</label>
                <input
                  type="text"
                  name="opt1"
                  value={productData.opt1}
                  placeholder="Enter option 1  "
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  onChange={handleInputChange}
                />
              </div>
    

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">option 2</label>
                <input
                  type="text"
                  name="opt2"
                  value={productData.opt2}
                  placeholder="Enter option  2"
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  onChange={handleInputChange}
                />
              </div>
            



              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">option 3</label>
                <input
                  type="text"
                  name="opt3"
                  value={productData.opt3}
                  placeholder="Enter option  3"
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  onChange={handleInputChange}
                />
              </div>
           





              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Answer</label>
                <input
                  type="text"
                  name="anwer"
                  value={productData.answer}
                  placeholder="Enter Answer  "
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  onChange={handleInputChange}
                />
              </div>
           






              <div>
                <button
                  className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={handleUpdate}
                >
                  UPDATE QUESTION
                </button>
              </div>
              <div>
                <button
                  className="w-full p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  onClick={handleDelete}
                >
                  DELETE QUESTION
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
