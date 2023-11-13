import express from 'express';

import {
    loginUser,
} from '../controllers/loginComponent.js';

const router = express.Router();

router.post('/', loginUser);

export default router;
