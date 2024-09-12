import express from "express";
import { SlotControllers } from "./Slots.controller";
import { SlotsValidations } from "./Slots.validation";
import validateRequest from "../../middlewares/validRequest";

const router = express.Router();

router.post(
  "/",
  validateRequest(SlotsValidations.slotValidationSchema),
  SlotControllers.createSlot
);

export const SlotRoutes = router;
