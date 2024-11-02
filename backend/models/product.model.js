import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    Question: {
      type: String,
      required: true,
    },

    opt1: {
      type: String,
      required: true,
    },
    opt2: {
      type: String,
      required: true,
    },
    opt3:{
      type:String,
      required:true
    },
    answer:{
      type:String,
      required:true
    },
    category: {
      type: String,
      required: true,
    },
  
  },
  { timestamps: true }
);



export default mongoose.model("products", productSchema);

