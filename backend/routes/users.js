import { Router } from 'express';
import { createUser, deleteUser, getUserById, updateUser, updateUserActivity } from "../controllers/usersController.js";

export const usersRouter = Router();

usersRouter.post('/signup', createUser);
usersRouter.get('/:id', getUserById);
usersRouter.put('/:id', updateUser);
usersRouter.patch('/:id/activity', updateUserActivity);
usersRouter.delete('/delete/:id', deleteUser);
