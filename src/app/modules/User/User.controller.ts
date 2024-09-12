import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./User.service";
import { TUser } from "./User.interface";

const createUserAndAdmin = catchAsync(async (req, res) => {
  const userData: TUser = req.body;
  //   console.log(userData);
  const result = await UserServices.createUserAndAdminToDB(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

export const UsersAndAdminController = {
  createUserAndAdmin,
};
