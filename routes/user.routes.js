import {Router}  from 'express';
import UserController from '../controllers/user.controller.js';
import { validateUpdateUserInput } from '../middlewares/validation.js';
import { authorizePermissions } from '../middlewares/authentication.js';


const userRouter = Router();

userRouter.get('/admin/app-stats', authorizePermissions('admin'), UserController.app_stats);
userRouter.get('/current-user', UserController.current_user)
userRouter.patch('/update-user', validateUpdateUserInput, UserController.update_user);

export default userRouter;