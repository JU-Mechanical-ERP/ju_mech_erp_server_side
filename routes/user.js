import express from 'express';
import upload from '../helpers/multer.js';
import { addUser } from '../controllers/user.js';

const router = express.Router();

router.post('/addetails', addUser);
export default router;
