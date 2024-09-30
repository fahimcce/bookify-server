import { Router } from "express";
import validateRequest from "../../middileWare/validateRequest";
import { slotValidation } from "./slot.validation";
import { slotController } from "./slot.controller";
import authGuared from "../../middileWare/authGuared";
import { USER_ROLE } from "../User/user.constant";

const router = Router();

router.post("/", validateRequest(slotValidation.addSlotValidationSchema), slotController.addSlot);
router.get("/availability", slotController.getAllSlot);
router.delete("/delete/:id", authGuared(USER_ROLE.admin), slotController.deleteSlot);
router.patch("/update/:id", authGuared(USER_ROLE.admin), slotController.updateSlot);

export const slotRoute = router;
