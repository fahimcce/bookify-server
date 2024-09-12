import jwt, { JwtPayload } from "jsonwebtoken";

import httpStatus from "http-status";

import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/User/user.interface";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import config from "../config";
import { User } from "../modules/User/user.model";
interface customRequest extends Request {
  user: JwtPayload;
}
const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(
    async (req: customRequest, res: Response, next: NextFunction) => {
      const bearrerToken = req.headers.authorization;
      if (!bearrerToken) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }
      const token = bearrerToken?.split(" ")[1];
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;

      const { email, role, iat, exp } = decoded;
      // chheck if the user is exist
      const existingUser = await User.findOne({ email: email });
      if (!existingUser) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }
      // check if the user is deleted
      const isDeleteduser = existingUser?.isDeleted === true;
      if (isDeleteduser) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }
      // procced with verification
      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "You are not eligible for this oparation"
        );
      }
      req.user = decoded as JwtPayload;
      next();
    }
  );
};

export default auth;
