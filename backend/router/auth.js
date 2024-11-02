import express from 'express';
import {
  registerController,
  loginController,
  testController,
  Forget,
  verifyotp,
  updatePassword,
} from '../controllers/authcontroller.js';
import { isAdmin, requireSignIn } from '../middlewares/authmiddleware.js';


const router = express.Router();

// User registration route
router.post('/register', registerController);

// User login route
router.post('/login', loginController);

// Test route for admin access, protected by sign-in and admin check
router.get('/test', requireSignIn, isAdmin, testController);

// Route to check if a user is authenticated (without admin check)
router.get('/userauth', requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});


router.get('/adminauth', requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});



router.post('/resetpassword',  updatePassword)









router.post('/forgetpswd',  Forget)

router.post('/verifyotp',  verifyotp)



export default router;

