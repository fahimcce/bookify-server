import QueryBuilder from "../../builder/queryBuilder";
import { User } from "./user.model";

const getAllUsersFromDb = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find({ isDeleted: false }), query).search(["role", "name"]).filter().sort();
  const result = await userQuery.modelQuery;
  return result;
};

const deleteUserDb = async (id: string) => {
  return await User.findByIdAndUpdate(id, { isDeleted: true });
};

export const userServices = {
  getAllUsersFromDb,
  deleteUserDb,
};
