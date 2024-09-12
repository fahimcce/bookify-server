import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import validateRequest from "../../middlewares/validRequest";
import { SlotsValidations } from "./Slots.validation";
import { SlotControllers } from "./Slots.controller";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(SlotsValidations.slotValidationSchema),
  SlotControllers.createSlot
);
router.get("/availability", SlotControllers.getAllSlots);

export const slotRoute = router;
