import { Router } from 'express';
import { fetchUserData, updateUserData } from '../controller/api';

const router = Router();

// Fetch user data
router.get('/fetch-user-data/:id', fetchUserData);

// Update user data
router.put('/update-user-data/:id', updateUserData);

export default router;
