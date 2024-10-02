"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/Auth/auth.route");
const user_route_1 = require("../modules/User/user.route");
const room_route_1 = require("../modules/Room/room.route");
const booking_route_1 = require("../modules/booking/booking.route");
const slot_route_1 = require("../modules/slot/slot.route");
const router = express_1.default.Router();
const moudleRoute = [
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
        route: room_route_1.roomRoutes,
    },
    {
        path: "/slots",
        route: slot_route_1.slotRoute,
    },
    {
        path: "/",
        route: booking_route_1.bookingsRouter,
    },
];
moudleRoute.forEach((route) => router.use(route.path, route.route));
exports.default = router;
