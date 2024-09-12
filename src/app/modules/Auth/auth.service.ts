import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "../User/user.interface";
import { User } from "../User/user.model";
import { TLogin, tokenPayload } from "./auth.interface";
import { AnyExpression } from "mongoose";
import { createToken } from "./auth.utils";
import config from "../../config";

const signUpIntoDb = async (payLoad: TUser) => {
  // check use already exist
  const isUserExist = await User.findOne({ email: payLoad.email });
  if (isUserExist) {
    throw new AppError(
      httpStatus.ALREADY_REPORTED,
      "User already Exist. Please login"
    );
  }
  const result = await User.create(payLoad);
  return result;
};
const loginDb = async (payLoad: TLogin) => {
  // check user exist
  const existingUser: AnyExpression = await User.findOne({
    email: payLoad.email,
  });
  if (!existingUser) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `User not found with this ${payLoad.email}`
    );
  }
  const tokenPayload: tokenPayload = {
    email: existingUser?.email,
    role: existingUser?.role,
  };
  const token = createToken(
    tokenPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );
  const tokenWithBearer = token;

  const result = { existingUser, token: tokenWithBearer };
  return result;
};
export const authServices = {
  signUpIntoDb,
  loginDb,
};
