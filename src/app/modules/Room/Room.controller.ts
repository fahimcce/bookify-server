import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { roomsServices } from "./room.service";

const createRooms = catchAsync(async (req, res) => {
  const result = await roomsServices.creatRooms(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room added successfully",
    data: result,
  });
});
// get all rooms

const getAllRooms = catchAsync(async (req, res) => {
  const result = await roomsServices.getAllRoomsFromDb(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rooms retrieved successfully",
    data: result,
  });
});
// get a rooms
const getArooms = catchAsync(async (req, res) => {
  const result = await roomsServices.getAroomsFromDb(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room retrieved successfully",
    data: result,
  });
});
// get a rooms
// const getSomeRooms = catchAsync(async (req, res) => {
//   const result = await roomsServices.getSomeRoomsDb(req.body);
//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: "Room retrieved successfully",
//     data: result,
//   });
// });
// update rooms
const updateRooms = catchAsync(async (req, res) => {
  const result = await roomsServices.updateRoomsIntoDb(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room updated successfully",
    data: result,
  });
});
const deleteRoom = catchAsync(async (req, res) => {
  const result = await roomsServices.deleteRoomFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room deleted successfully",
    data: result,
  });
});
export const roomsController = {
  createRooms,
  getAllRooms,
  getArooms,
  updateRooms,
  deleteRoom,
};
