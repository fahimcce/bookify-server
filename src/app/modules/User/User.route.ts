import express from "express";

import validateRequest from "../../middlewares/validRequest";
import { UsersAndAdminController } from "./User.controller";
import { userValidationSchema } from "./User.validation";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(userValidationSchema),
  UsersAndAdminController.createUserAndAdmin
);

export const UserRoutes = router;
