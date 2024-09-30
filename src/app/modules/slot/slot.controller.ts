import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { slotService } from "./slot.service";

const addSlot = catchAsync(async (req, res) => {
  const result = await slotService.addSlotDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Slots created successfully",
    data: result,
  });
});

const getAllSlot = catchAsync(async (req, res) => {
  const result = await slotService.getAllSlotDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Available slots retrieved successfully",
    data: result,
  });
});
const deleteSlot = catchAsync(async (req, res) => {
  const result = await slotService.deleteSlotDb(req?.params?.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slot Deleted Successfull",
    data: result,
  });
});
const updateSlot = catchAsync(async (req, res) => {
  const result = await slotService.updateSlots(req?.params?.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slot Updated successfully",
    data: result,
  });
});
export const slotController = {
  addSlot,
  getAllSlot,
  deleteSlot,
  updateSlot,
};
