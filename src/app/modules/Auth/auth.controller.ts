import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";
import AppError from "../../errors/AppError";

const signUp = catchAsync(async (req, res) => {
  const result = await authServices.signUpIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});
// login
const login = catchAsync(async (req, res) => {
  try {
    const result = await authServices.loginDb(req.body);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged in successfully",
      token: result?.token,
      data: result?.existingUser,
    });
  } catch (error: any) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

export const authController = {
  signUp,
  login,
};
