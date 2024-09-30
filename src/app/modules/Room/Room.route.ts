import { Router } from "express";
import validateRequest from "../../middileWare/validateRequest";
import { roomValidation } from "./room.validation";
import { roomsController } from "./room.controller";
import authGuared from "../../middileWare/authGuared";
import { USER_ROLE } from "../User/user.constant";

const router = Router();

router.post("/", authGuared(USER_ROLE.admin), validateRequest(roomValidation.createRoomsValidationSchema), roomsController.createRooms);
router.get("/", roomsController.getAllRooms);
router.get("/:id", roomsController.getArooms);
// router.get("/rooms/someRooms", roomsController.getSomeRooms);
// update rooms
router.put("/:id", authGuared(USER_ROLE.admin), validateRequest(roomValidation.updateRoomsValidationSchema), roomsController.updateRooms);
router.delete("/:id", authGuared(USER_ROLE.admin), roomsController.deleteRoom);
export const roomRoutes = router;
