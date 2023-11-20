import express from 'express';

import {
  createStaff,
  getStaff,
  getPersonal,
  updateStaff,
  deleteStaff,
} from '../controllers/staffController.js';
import { verifyToken } from '../network/verifyToken.js';

const router = express.Router();

// router.get('/', verifyToken, getStaff);
router.get('/', getStaff);
router.post('/new', createStaff);
router.get('/:id', getPersonal);
router.patch('/:id', updateStaff);
router.delete('/:id', deleteStaff);

export default router;
