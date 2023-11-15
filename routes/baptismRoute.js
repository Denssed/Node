import express from 'express';

import {
  createBaptism,
  getBaptisms,
  getBaptism,
  updateBaptism,
  deleteBaptism,
} from '../controllers/baptismController.js';
import { verifyToken } from '../network/validateToken.js';

const router = express.Router();

router.get('/', getBaptisms);
router.post('/new', createBaptism);
router.get('/:id', getBaptism);
router.patch('/:id', updateBaptism);
router.delete('/:id', deleteBaptism);

export default router;
