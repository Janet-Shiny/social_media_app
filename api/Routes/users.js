import express from 'express'
import { getuser } from '../controllers/user.js';
const router =express.Router()
router.get("/find/:userId",getuser)

export default router;