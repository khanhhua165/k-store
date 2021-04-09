import { Document } from "mongoose";
import { IProduct } from "../products/product.interface";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  email: string;
  addrress?: string;
  phone: number;
  favorite: IProduct["_id"][];
}
