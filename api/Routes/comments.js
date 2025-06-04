import express from 'express'
import { getcomments } from '../controllers/comment.js';
const router =express.Router()
router.get("/find/:userId",getcomments)

export default router;