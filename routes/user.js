import express from 'express';
import upload from '../helpers/multer.js';
import { login, signup, updateUser } from '../controllers/user.js';

const router = express.Router();
router.post('/login', login);
router.post('/signup', signup);
router.post('/updatedetails', updateUser);
export default router;
