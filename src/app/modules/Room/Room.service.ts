import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { TMeetingRoom } from "./Room.interface";
import { Rooms } from "./Room.model";
import mongoose from "mongoose";

const createRoomIntoDB = async (payload: TMeetingRoom) => {
  const result = await Rooms.create(payload);
  return result;
};

const getSingleRoomFromDB = async (id: string) => {
  const result = await Rooms.findById(id);
  return result;
};

const getAllRoomsFromDB = async (query: Record<string, unknown>) => {
  const meetingQuery = new QueryBuilder(Rooms.find(), query);

  const result = await meetingQuery.modelQuery;
  return result;
};

// ------------------------update Rooms----------------------------
const updateRoomsIntoDB = async (id: string, payload: TMeetingRoom) => {
  const {
    name,
    roomNo,
    floorNo,
    capacity,
    pricePerSlot,
    amenities,
    ...remainingRoomData
  } = payload;

  // Find the existing room document
  const existingRoom = await Rooms.findById(id);
  if (!existingRoom) {
    throw new AppError(httpStatus.BAD_REQUEST, "ID Not Found!!");
  }

  // Merge new amenities with existing ones
  let updatedAmenities = existingRoom.amenities || [];
  if (amenities && Array.isArray(amenities)) {
    updatedAmenities = Array.from(new Set([...updatedAmenities, ...amenities]));
  }

  // Prepare the data for update
  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingRoomData,
    ...(name ? { name } : {}),
    ...(roomNo ? { roomNo } : {}),
    ...(floorNo ? { floorNo } : {}),
    ...(capacity ? { capacity } : {}),
    ...(pricePerSlot ? { pricePerSlot } : {}),
    amenities: updatedAmenities,
  };

  // Update the room in the database
  const result = await Rooms.findByIdAndUpdate(id, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteRoomFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deletedRoom = await Rooms.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedRoom) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete Room !");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedRoom;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    if (err instanceof AppError) {
      throw err;
    }
    throw new Error("An unexpected error occurred while deleting the room");
  }
};

export const RoomServices = {
  createRoomIntoDB,
  getSingleRoomFromDB,
  getAllRoomsFromDB,
  updateRoomsIntoDB,
  deleteRoomFromDB,
};
