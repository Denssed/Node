import express from 'express';

import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { verifyToken } from '../network/verifyToken.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/new', createUser);
router.get('/:id', getUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
