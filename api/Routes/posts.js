import express from 'express'
import { getpost,addpost } from '../controllers/post.js';
const router =express.Router()
router.get("/",getpost)
router.post("/",addpost)


export default router;