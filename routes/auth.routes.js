import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { validateUserLoginInput, validateUserRegisterInput } from "../middlewares/validation.js";

const authRouter = Router();


authRouter.route("/register").post(validateUserRegisterInput, AuthController.register);
authRouter.route("/login").post(validateUserLoginInput, AuthController.login);
authRouter.route("/logout").get(AuthController.logout);


export default authRouter;