import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";
import AppError from "../../erros/AppError";

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
  const result = await authServices.loginDb(req.body);
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    token: result?.token,
    data: result?.existingUser,
  });
});
const getOneUser = catchAsync(async (req, res) => {
  const result = await authServices.getOneUserDb(req.query);
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "User got successfully",
    data: result,
  });
});
const makeAdmin = catchAsync(async (req, res) => {
  const result = await authServices.makeAdminDb(req.params.id);
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "User Successfully Promototed to admin",
    data: result,
  });
});
export const authController = {
  signUp,
  login,
  makeAdmin,
  getOneUser,
};
