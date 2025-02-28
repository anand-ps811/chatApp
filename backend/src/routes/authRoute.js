import express from "express";
import{signup,login,logout,updateProfile,checkAuth} from '../controllers/authController.js'
import { authMiddleware } from "../middleware/authMiddleware.js";


const router= express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.put('/update-profile',authMiddleware,updateProfile)
router.get('/check',authMiddleware,checkAuth)
export default router;