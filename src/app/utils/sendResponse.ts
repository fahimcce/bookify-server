import { Response } from "express";

type TResponse<T> = { statusCode: number; success: boolean; message: string; data: T };

// send response function
const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  // if (res?.req.method === "GET") {
  //   if (data?.data === Array && data?.data?.length < 1) {
  //     res.status(data.statusCode).json({
  //       success: data.success,
  //       statusCode: data.statusCode,
  //       message: "No Data Found",
  //       data: data.data,
  //     });
  //   }
  //   if (Object.keys(data?.data).length < 1) {
  //     res.status(data.statusCode).json({
  //       success: data.success,
  //       statusCode: data.statusCode,
  //       message: "No Data Found",
  //       data: data.data,
  //     });
  //   }
  // }
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
