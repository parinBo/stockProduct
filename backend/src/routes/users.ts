import express from "express";
import { register, signin, signout } from "../controllers/users";

export const userRouter = express.Router();

userRouter.post('/signin', signin);

userRouter.post('/register', register);

userRouter.post('signout', signout);
