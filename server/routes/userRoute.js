import express from "express";
import { isAuth, login, logout, registerUser } from "../controllers/userController.js";
import authUser from "../middleware/authAdmin.js";

const userRouter = express.Router()

userRouter.post("/registerUser", registerUser);
userRouter.post("/login", login);
userRouter.get("/is-auth", authUser, isAuth);
userRouter.post("/logout", authUser, logout);



export default userRouter;
