import express from 'express';
import { getuser, updateuser, searchUsers } from '../controllers/user.js';

const router = express.Router();

router.get('/find/:userId', getuser);
router.get('/search', searchUsers);
router.put('/', updateuser);

export default router;
