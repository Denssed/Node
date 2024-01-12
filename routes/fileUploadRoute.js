import express from 'express';

import {
  uploadPhoto,
} from '../controllers/fileUploadController.js';

const router = express.Router();

// router.get('/', getUsers);
router.post('/upload', uploadPhoto);
// router.get('/:id', getUser);
// router.patch('/:id', updateUser);
// router.delete('/:id', deleteUser);

export default router;
