import express from 'express';
import multer from 'multer';
import { login, register, logout } from '../controllers/auth.js';

const router = express.Router();
router.post("/login", login);
router.post("/register",register); // ✅ Profile upload handled
router.post("/logout", logout);

export default router;
