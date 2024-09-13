import { Router } from "express";
import { USER_ROLE } from "../User/user.constant";
import validateRequest from "../../middlewares/validRequest";
import auth from "../../middlewares/auth";
import { RoomControllers } from "./Room.controller";
import { roomValidation } from "./Room.validation";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(roomValidation.createRoomsValidationSchema),
  RoomControllers.createRoom
);
router.get("/", RoomControllers.getAllRooms);
router.get("/:id", RoomControllers.getSingleRoom);
// update rooms
router.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(roomValidation.updateRoomsValidationSchema),
  RoomControllers.updateRooms
);
router.delete("/:id", auth(USER_ROLE.admin), RoomControllers.deleteRoom);
export const roomRoutes = router;
