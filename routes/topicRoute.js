import express from 'express';
import createTopic from '../controllers/topic/createTopic.js';
import getTopics from '../controllers/topic/getTopics.js';
import { protect } from '../middleware/auth.js';
import { sort } from '../middleware/sort.js';

const router = express.Router();

router.get('/:id', sort, getTopics);
router.post('/', protect, sort, createTopic);

export default router;
