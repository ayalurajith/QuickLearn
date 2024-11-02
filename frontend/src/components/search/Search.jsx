import React,{useState,useEffect} from "react";
import { useSearch  } from "../../context/search.jsx";
import axios from "axios";
import { useNavigate ,Link } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";  
import { AiOutlineClose } from "react-icons/ai";
 const SearchInput =()=>{
    const [values,setValues]= useSearch ()
    const navigate = useNavigate()
    const [products,setProducts]=useState([])

    const  handleSubmit = async (e) =>{
        e.preventDefault()
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/product/search/${values.keyword}`)
            setValues({...values,results:data});
            navigate('/search')
        } catch (error) {
            console.log(error);
            
        }
    }
   
    return(
      <form
      className="flex border w-3/4 h-7 justify-center items-center mt-2 mb-2 rounded sm:p-4"
      onSubmit={handleSubmit}
    >
      <div className="relative flex items-center w-full">
        <input
          type="text"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          placeholder="Search..."
          className="outline-none ml-2 focus:ring-0 border-transparent w-full pr-8" 
        />

        {values.keyword && (
          <AiOutlineClose
            className="absolute right-2 text-black cursor-pointer"
            onClick={() => setValues({ ...values, keyword: "" })}
          />
        )}
      </div>

      <button
        type="submit"
        className="ml-2 p-2 h-9 rounded-lg text-black flex items-center justify-center"
      >
        <BiSearchAlt className="text-lg" />
      </button>
    </form>
    )

}
export default SearchInput