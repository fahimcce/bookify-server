// import { USER_ROLE } from "../Auth/auth.constant";
export type TUserRole = "admin" | "user";
export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: TUserRole;
  isDeleted?: boolean;
};

// export type TUserRole = keyof typeof USER_ROLE;
