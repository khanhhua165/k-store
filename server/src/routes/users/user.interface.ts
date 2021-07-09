import { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  password: string;
  email: string;
  city?: string;
  state?: string;
  address?: string;
  phone?: string;
  isAdmin: boolean;
  recoveryCode?: string;
  orders: {
    orderId: string;
    orderDate: Schema.Types.Date | number;
    orderTotal: number;
  }[];
  recoveryCodeExpiration?: Date | number;
}

export interface IPasswordChange {
  password: string;
  newPassword: string;
}
