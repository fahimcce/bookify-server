"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: 0 },
    phone: { type: String, required: true },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    address: { type: String, required: true },
    isDeleted: { type: Boolean, default: false, select: 0 },
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)("User", UserSchema);
