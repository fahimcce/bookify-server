import { Router } from "express";
import { userRouters } from "../modules/User/user.route";
import { slotRoute } from "../modules/Slots/Slots.route";
import { authRoutes } from "../modules/Auth/auth.route";
import { bookingsRouter } from "../modules/Booking/booking.route";
import { roomRoutes } from "../modules/Room/Room.route";

const router = Router();

const moduleRoutes = [
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

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
