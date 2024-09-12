import express from "express";
import { userController } from "./user.controller";

// import authGuared from "../../middileWare/authGuared";

const router = express.Router();

router.get("/", userController.getAllUsers);

export const userRouters = router;
