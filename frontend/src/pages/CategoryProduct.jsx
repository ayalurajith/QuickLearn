import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CategoryProduct = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});

  // Fetch products by category
  const getProductByCat = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/product/product-category/${id}`);
      const shuffledData = res.data.products.map((p) => ({
        ...p,
        options: shuffleArray([p.opt1, p.opt2, p.opt3, p.answer]), // Shuffle options
      }));
      setProducts(shuffledData);
      setCategory(res.data.category);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Shuffle array utility
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    if (id) getProductByCat();
  }, [id]);

  // Handle option selection
  const handleOptionClick = (questionId, option) => {
    if (!selectedOptions[questionId]) {
      setSelectedOptions((prev) => ({
        ...prev,
        [questionId]: option,
      }));
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">{category.name}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products?.map((p) => {
            const selectedOption = selectedOptions[p._id];
            return (
              <div key={p._id} className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
                <h5 className="text-lg font-semibold mb-2">{p.Question}</h5>
                {p.options.map((option, index) => {
                  const isAnswer = option === p.answer;
                  let optionClass = "p-2 mb-1 cursor-pointer rounded";

                  // Add styling based on whether the option is selected and correct/incorrect
                  if (selectedOption) {
                    if (selectedOption === option) {
                      optionClass += isAnswer ? " bg-green-500 text-white" : " bg-red-500 text-white";
                    } else if (isAnswer) {
                      optionClass += " bg-green-200";
                    } else {
                      optionClass += " bg-gray-200";
                    }
                  } else {
                    optionClass += " bg-gray-100 hover:bg-gray-200";
                  }

                  return (
                    <div
                      key={index}
                      className={optionClass}
                      onClick={() => handleOptionClick(p._id, option)}
                      style={{ cursor: selectedOption ? 'not-allowed' : 'pointer' }}
                    >
                      • {option}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
