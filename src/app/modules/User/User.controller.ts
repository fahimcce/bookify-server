import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";

const getAllUsers = catchAsync(async (req, res) => {
  const result = await userServices.getAllUsersFromDb(req.query);
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "All Users Retrived successfully",
    data: result,
  });
});
const deleteUser = catchAsync(async (req, res) => {
  const result = await userServices.deleteUserDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Deleted successfully",
    data: result,
  });
});
export const userController = {
  getAllUsers,
  deleteUser,
};
