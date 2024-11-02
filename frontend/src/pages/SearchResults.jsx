import React from "react";
import Layout from "../components/layout/Layout";
import { useSearch } from "../context/search";

const SearchResult = () =>{
    const [values,setValues] =useSearch()
    return(
        <>
        <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[73vh]">
           
            <h6 className=" p-12 text-center text-red-700 text-2xl font-bold  font-sans">{values?.results.length< 1 ? ' ! Oops No Matches Found':` ${values?.results.length} Result Found ` }</h6>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {values?.results.map((p) => (
                  <div key={p._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                   
                      <div className="p-4">
                        <h5 className="text-lg font-semibold mb-2">{p.Question}</h5>
                        <p className="text-gray-600">{p.answer}</p>
                      
                      </div>
                  </div>
                ))}
              </div>
        
    </div>
    </Layout>
        </>
    )
}

export default SearchResult