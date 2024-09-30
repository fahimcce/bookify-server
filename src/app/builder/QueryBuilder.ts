import { Query, FilterQuery } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  // search method
  search(searchAbleField: string[]) {
    const search = this.query?.search;
    if (this?.query?.search) {
      this.modelQuery = this.modelQuery.find({
        $or: [
          // Add search conditions for the specified fields
          ...searchAbleField.map((fields) => ({ [fields]: { $regex: search, $options: "i" } } as FilterQuery<T>)),

          // Add search condition for the 'amenities' array field
          { amenities: { $elemMatch: { $regex: search, $options: "i" } } },
        ],
      });
    }
    return this;
  }
  // filtering
  filter() {
    const queryObj = { ...this.query }; //copy of all queries
    const excludeFields = ["search", "sort", "limit", "range", "page", "fields", "capacity", "roomsId"];
    excludeFields.forEach((el) => delete queryObj[el]);
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }
  // range
  range() {
    const range = this.query.range;
    if (range) {
      const newRange = (range as string).split("-");
      const lowestPrice = Number(newRange[0]);
      const hiestprice = Number(newRange[1]);
      // let rangevalue = newRange.map((range) => new RegExp(`^${range}$`, "i"));
      this.modelQuery = this.modelQuery.find({
        pricePerSlot: { $gte: lowestPrice, $lte: hiestprice },
      });
    }
    return this;
  }
  capcity() {
    const capacity = this?.query?.capacity;
    if (capacity) {
      const newCapacity = (capacity as string).split("-");
      const lowestPrice = Number(newCapacity[0]);
      const hiestprice = Number(newCapacity[1]);
      // let rangevalue = newRange.map((range) => new RegExp(`^${range}$`, "i"));
      this.modelQuery = this.modelQuery.find({
        capacity: { $gte: lowestPrice, $lte: hiestprice },
      });
    }
    return this;
  }
  //   sort
  sort() {
    const sort = this?.query?.sort || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }
  // roomsId
  roomsId() {
    const roomsId = this.query.roomsId;
    if (roomsId) {
      const newroomsId = (roomsId as string).split(" ");
      // let rangevalue = newRange.map((range) => new RegExp(`^${range}$`, "i"));
      this.modelQuery = this.modelQuery.find({
        _id: newroomsId,
      });
    }
    return this;
  }
  limit() {
    const limit = Number(this?.query?.limit || 6);
    this.modelQuery = this.modelQuery.find().limit(limit as number);
    return this;
  }

  //   pagination
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 6;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }
  async countTotal() {
    const totalQuery = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQuery);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 6;
    const totalPage = Math.ceil(total / limit);
    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBuilder;
