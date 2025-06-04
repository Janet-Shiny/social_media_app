import express from 'express'
import { getpost } from '../controllers/post.js';
const router =express.Router()
router.get("/find/:userId",getpost)

export default router;