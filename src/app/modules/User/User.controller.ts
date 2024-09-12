import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { userServices } from "./user.service";

const getAllUsers = catchAsync(async (req, res) => {
  console.log(req.user);
  const result = await userServices.getAllUsersFromDb();
  try {
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "All Users Retrived successfully",
      data: result,
    });
  } catch (error) {}
});

export const userController = {
  getAllUsers,
};
