import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  password: string;
  email: string;
  city?: string;
  state?: string;
  address?: string;
  phone?: string;
  isAdmin: boolean;
}
