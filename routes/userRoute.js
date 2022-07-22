import express from 'express';
import { protect } from '../middleware/auth.js';
import { sort } from '../middleware/sort.js';

const router = express.Router();

router.get('/', () => {});
router.get('/:id', () => {});
router.post('/', () => {});

export default router;
