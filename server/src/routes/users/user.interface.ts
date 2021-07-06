import { Document, Types } from "mongoose";

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
  recoveryCodeExpiration?: Date | number;
}

export interface IPasswordChange {
  password: string;
  newPassword: string;
}
