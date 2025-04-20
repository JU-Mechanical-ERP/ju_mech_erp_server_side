import express from 'express';
import upload from '../helpers/multer.js';
import { createreq, getUserRequests, login, signup, updateUser } from '../controllers/user.js';

const router = express.Router();
//? backend routes
router.post('/login', login); // for user login
router.post('/signup', signup); // for user signup
router.post('/updatedetails', updateUser); // for updating details
router.post('/createreq', createreq); 
router.post('/getreqs', getUserRequests);
export default router;
