import { TRooms } from "./room.interface";
import { Rooms } from "./room.model";
import QueryBuilder from "../../builder/queryBuilder";

import { searchableField } from "./searchAbleField";

const creatRooms = async (payLoad: TRooms) => {
  const result = await Rooms.create(payLoad);
  return result;
};
// get a rooms
const getAllRoomsFromDb = async (query: Record<string, unknown>) => {
  const roomquery = new QueryBuilder(Rooms.find({ isDeleted: false }), query)
    .filter()
    .sort()
    .limit()
    .paginate()
    .roomsId();
  const result = await roomquery.modelQuery;
  const meta = await roomquery.countTotal();
  return { result, meta };
  // return result;
};

// get a rooms
const getAroomsFromDb = async (id: string) => {
  const result = await Rooms.findById(id);
  return result;
};
// update rooms into db
const updateRoomsIntoDb = async (id: string, payLoad: TRooms) => {
  // const { amenities, ...restData } = payLoad;
  const result = await Rooms.findByIdAndUpdate(id, payLoad, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteRoomFromDb = async (payload: string) => {
  const result = await Rooms.findByIdAndUpdate(
    payload,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const roomsServices = {
  creatRooms,
  getAllRoomsFromDb,
  getAroomsFromDb,
  updateRoomsIntoDb,
  deleteRoomFromDb,
};
