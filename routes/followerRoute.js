import express from 'express';
import followUser from '../controllers/follower/followUser.js';
import getMyFollowers from '../controllers/follower/getMyFollowers.js';
import unfollowUser from '../controllers/follower/unfollowUsers.js';
import { protect } from '../middleware/auth.js';
import { sort } from '../middleware/sort.js';

const router = express.Router();

router.get('/follow/:id', protect, followUser);
router.get('/unfollow/:id', protect, unfollowUser);
router.get('/', protect, sort, getMyFollowers);

export default router;
