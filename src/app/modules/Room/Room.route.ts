import express from "express";
import { RoomControllers } from "./Room.controller";

const router = express.Router();

router.post("/", RoomControllers.createRoom);
router.get("/:id", RoomControllers.getSingleRoom);
router.get("/", RoomControllers.getAllRooms);
router.put("/:id", RoomControllers.updateRooms);
router.delete("/:id", RoomControllers.deleteRoom);

export const RoomRoutes = router;
