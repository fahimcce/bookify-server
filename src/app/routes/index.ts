import express from "express";
import { authRoutes } from "../modules/Auth/auth.route";
import { userRouters } from "../modules/User/user.route";
import { roomRoutes } from "../modules/Room/room.route";
import { bookingsRouter } from "../modules/booking/booking.route";
import { slotRoute } from "../modules/slot/slot.route";
const router = express.Router();

const moudleRoute = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/users",
    route: userRouters,
  },
  {
    path: "/rooms",
    route: roomRoutes,
  },
  {
    path: "/slots",
    route: slotRoute,
  },
  {
    path: "/",
    route: bookingsRouter,
  },
];

moudleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
