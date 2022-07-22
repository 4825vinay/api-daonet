import express from 'express';
import getCommuityMembers from '../controllers/community/getCommunityMembers.js';
import joinCommunity from '../controllers/community/joinCommunity.js';
import leaveCommunity from '../controllers/community/leaveCommunity.js';
import myJoinedCommunities from '../controllers/community/myJoinedCommunities.js';
import { protect } from '../middleware/auth.js';
import { sort } from '../middleware/sort.js';

const router = express.Router();

router.get('/', protect, sort, myJoinedCommunities);
router.get('/:id', sort, getCommuityMembers);
router.delete('/:id', protect, leaveCommunity);
router.post('/', protect, joinCommunity);

export default router;
