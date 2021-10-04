import express, { Router } from 'express';
import { signIn, signOutUser } from '../controllers/AuthController/authController';
import authMiddleware from '../Middlewares/authMiddleware';

const router: Router = express.Router();

router.post('/signin', signIn);
router.get('/signout', authMiddleware, signOutUser);

// move getUser to userRoutes

export default router;
