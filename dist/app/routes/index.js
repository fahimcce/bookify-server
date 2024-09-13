"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/User/user.route");
const Slots_route_1 = require("../modules/Slots/Slots.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const booking_route_1 = require("../modules/Booking/booking.route");
const Room_route_1 = require("../modules/Room/Room.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.authRoutes,
    },
    {
        path: "/users",
        route: user_route_1.userRouters,
    },
    {
        path: "/rooms",
        route: Room_route_1.roomRoutes,
    },
    {
        path: "/slots",
        route: Slots_route_1.slotRoute,
    },
    {
        path: "/",
        route: booking_route_1.bookingsRouter,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
