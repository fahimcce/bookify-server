import express from "express";
import { userController } from "./user.controller";
import authGuared from "../../middileWare/authGuared";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.get("/", authGuared(USER_ROLE.admin), userController.getAllUsers);
router.delete("/:id", authGuared(USER_ROLE.admin), userController.deleteUser);

export const userRouters = router;
