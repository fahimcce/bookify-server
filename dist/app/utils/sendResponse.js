"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// send response function
const sendResponse = (res, data) => {
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
exports.default = sendResponse;
