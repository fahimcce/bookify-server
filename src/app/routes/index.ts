import { Router } from "express";
import { UserRoutes } from "../modules/User/User.route";
import { RoomRoutes } from "../modules/Room/Room.route";
import { SlotRoutes } from "../modules/Slots/Slots.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/rooms",
    route: RoomRoutes,
  },
  {
    path: "/slots",
    route: SlotRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
