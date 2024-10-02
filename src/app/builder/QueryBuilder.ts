import { Query, FilterQuery } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  filter() {
    const queryObj = { ...this.query }; //copy of all queries
    const excludeFields = [
      "search",
      "sort",
      "limit",
      "range",
      "page",
      "fields",
      "capacity",
      "roomsId",
    ];
    excludeFields.forEach((el) => delete queryObj[el]);
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

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
