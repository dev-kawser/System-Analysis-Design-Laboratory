import express from "express";
import { adminLogin, adminLogout, isAdminAuth } from "../controllers/adminController.js";
import authAdmin from "../middleware/authUser.js";

const adminRouter = express.Router()

adminRouter.post("/login", adminLogin);
adminRouter.get("/is-auth", authAdmin, isAdminAuth);
adminRouter.post("/logout", authAdmin, adminLogout);



export default adminRouter;
