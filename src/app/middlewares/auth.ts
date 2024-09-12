import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    //  console.log(token)

    // Ensure that if the token is sent from the client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }

    //Ensure that is token is valid?
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { role, userId, iat } = decoded;

    //---------------------------------------------------------
    const user = await User.isUserExistsByCustomId(userId);

    // is user is Exists
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found!!");
    }

    // is User is Deleted
    if (await User.isDeleted(userId)) {
      throw new AppError(httpStatus.FORBIDDEN, "This user is Deleted!!");
    }

    const userStatus = user?.status;
    // is User is Blocked
    if (userStatus == "blocked") {
      throw new AppError(httpStatus.FORBIDDEN, "This user is Blocked!!");
    }

    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized !");
    }

    //----------------------------------------------------------

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not authorized hey!"
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
