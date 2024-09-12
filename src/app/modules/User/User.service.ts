import handleEmptyData from "../../utils/handleEmptyData";
import { User } from "./user.model";

const getAllUsersFromDb = async () => {
  const result = await User.find();
  return handleEmptyData(result);
};

export const userServices = {
  getAllUsersFromDb,
};
