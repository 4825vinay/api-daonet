import express from 'express';
import { protect } from '../middleware/auth.js';
import { sort } from '../middleware/sort.js';
import createCommunity from '../controllers/community/createCommunity.js';
import getAllCommunities from '../controllers/community/getAllCommunities.js';
import myCreatedCommunities from '../controllers/community/myCreatedCommunities.js';
import getCommunityById from '../controllers/community/getCommunityById.js';

const router = express.Router();

router.get('/', sort, getAllCommunities);
router.post('/', protect, createCommunity);
router.get('/my', protect, sort, myCreatedCommunities);
router.get('/:id', sort, getCommunityById);

export default router;
