import mongoose from "mongoose";
import { UserModel } from "./User.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { TUser } from "./User.interface";

const createUserAndAdminToDB = async (payload: TUser) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newUser = await UserModel.create([payload], { session });

    await session.commitTransaction();
    session.endSession();
    return newUser[0];
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(err);
  }
};

export const UserServices = {
  createUserAndAdminToDB,
};
