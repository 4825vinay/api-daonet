import express from 'express';
import createComment from '../controllers/post/createComment.js';
import getComments from '../controllers/post/getComments.js';
import { protect } from '../middleware/auth.js';
import { sort } from '../middleware/sort.js';

const router = express.Router();

router.get('/:id', sort, getComments);
router.post('/', protect, createComment);

export default router;
