import express from 'express';

import {
  createPresentation,
  getPresentations,
  getPresentation,
  updatePresentation,
  deletePresentation,
} from '../controllers/presentationController.js';
import { verifyToken } from '../network/verifyToken.js';

const router = express.Router();

router.get('/', getPresentations);
router.post('/new', createPresentation);
router.get('/:id', getPresentation);
router.patch('/:id', updatePresentation);
router.delete('/:id', deletePresentation);

export default router;
