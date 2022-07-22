import express from 'express';
import createPost from '../controllers/post/createPost.js';
import getMyPosts from '../controllers/post/getMyPosts.js';
import getPostsFromTopic from '../controllers/post/getPostsFromTopic.js';
import { protect } from '../middleware/auth.js';
import { sort } from '../middleware/sort.js';

const router = express.Router();

router.get('/', protect, sort, getMyPosts);
router.get('/:id', sort, getPostsFromTopic);
router.post('/', protect, createPost);

export default router;
