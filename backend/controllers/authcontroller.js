import userModel from "../models/user.model.js";
import nodemailer from 'nodemailer'
import {comparePassword,  hashPassword } from "../helpers/authhelper.js";
import JWT from "jsonwebtoken"
import dotenv from 'dotenv'





dotenv.config()

export const registerController = async (req,res)=>{
try {
    const { name, email, password, phone, address } = req.body;
    if (!name) {
        return res.send({ error: "Name is Required" });
      }
      if (!email) {
        return res.send({ message: "Email is Required" });
      }
      if (!password) {
        return res.send({ message: "Password is Required" });
      }
      if (!phone) {
        return res.send({ message: "Phone no is Required" });
      }
   
   

    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        msg: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword
      
    }).save();

    res.status(201).send({
      success: true,
      msg: "User Register Successfully"
      
    });
} catch (error) {
    console.log(error);
    res.status(500).send({success:false,msg:"error in register",error})
    
}
}

export const loginController = async (req, res) => {
    try {
      const { email, password } = req.body;
      //validation
      if (!email || !password) {
        return res.status(404).send({
          success: false,
          msg: "Invalid email or password",
        });
      }
      //check user
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(405).send({
          success: false,
          msg: "Email is not registerd",
        });
      }
      const match = await comparePassword(password, user.password);
      if (!match) {
        return res.status(404).send({
          success: false,
          msg: "Invalid Password",
        });
      }
      //token
      const token = await JWT.sign({ _id: user._id }, process.env.JWTSECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({
        success: true,
        msg: "login successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        msg: "Error in login",
        error,
      });
    }
  };
  
  export const testController = (req, res) => {
    try {
      res.send("Protected Routes");
    } catch (error) {
      console.log(error);
      res.send({ error });
    }
  };








// Import necessary modules

export const updatePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Validate inputs
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!newPassword) {
      return res.status(400).send({ message: "New password is required" });
    }

    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid user",
      });
    }

    // Hash the new password and update the user
    const hashed = await hashPassword(newPassword);
    await userModel.updateOne({ email }, { $set: { password: hashed } });

    // Send success response
    res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};






  

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port:587, //465 true
    secure:false, // You can change this to your email service provider
    auth: {
      user: process.env.EMAIL_USER, // Your email address from the environment variables
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
  });
  
  // Generate a 6-digit OTP
  const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString(); 
  
  // Store OTPs temporarily (consider using a database for production)
  const otpStore = {}; 

  export const Forget = async (req, res) => {
    const { email } = req.body;
    
    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ msg: "User not found " });
    }
  
    const otp = generateOtp(); // Generate OTP
    otpStore[email] = otp; // Store OTP for verification
    const mailOptions = {
      from: {
        name: 'CJ ATTIRE',
        address: process.env.EMAIL_USER,
      },
      to: email,
      subject: 'Your OTP Code for Quick Learn',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #0044cc; padding: 20px; text-align: center;">
              <h2 style="color: #ffffff; margin: 0;">CJ ATTIRE</h2>
            </div>
            <div style="padding: 20px;">
              <h3>Hello,</h3>
              <p>Thank you for choosing Quick Learn. To proceed with your request, please use the OTP code provided below:</p>
              <p style="text-align: center; font-size: 24px; font-weight: bold; color: #0044cc;">${otp}</p>
              <p>If you did not request this code, please ignore this email.</p>
              <p>Thank you,<br>Quick Learn Team</p>
            </div>
            <div style="background-color: #f7f7f7; padding: 10px; text-align: center; font-size: 12px; color: #777;">
              <p>This is an automated email, please do not reply.</p>
            </div>
          </div>
        </div>
      `,
    };
    
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'OTP sent to your email.' });
    } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ error: 'Failed to send OTP. Please try again.' });
    }
  };
  




  export const verifyotp = async (req, res) => {
    const { email, otp } = req.body;
  
    // Check if the OTP matches
    if (otpStore[email] === otp) {
      delete otpStore[email]; // OTP verified, remove it
      res.status(200).json({ message: 'OTP verified successfully!' });
    } else {
      res.status(400).json({ error: 'Invalid OTP. Please try again.' });
    }
  };
  










  




