import express from "express";
import validateRequest from "../../middlewares/validRequest";
import { userValidations } from "../User/user.validation";
import { authController } from "./auth.controller";
import { authValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(userValidations.userValidationSchema),
  authController.signUp
);
router.post(
  "/login",
  validateRequest(authValidation.loginValidationSchema),
  authController.login
);

export const authRoutes = router;
