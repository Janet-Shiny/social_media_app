import express from 'express'
import { getlikes } from '../controllers/like.js';
const router =express.Router()
router.get("/find/:userId",getlikes)

export default router;