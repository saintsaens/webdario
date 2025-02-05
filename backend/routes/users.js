import { Router } from 'express';
import { createUser, deleteUser, getUserById, updateUser } from "../controllers/usersController.js";

export const usersRouter = Router();

usersRouter.post('/signup', createUser);
usersRouter.get('/:id', getUserById);
usersRouter.put('/:id', updateUser);
usersRouter.delete('/delete/:id', deleteUser);
