import { Schema, Document } from "mongoose";
import { IProduct } from "../products/product.interface";
import { IUser } from "../users/user.interface";

export interface IOrder extends Document {
  user: IUser["_id"];
  items: { product: IProduct["_id"]; quantity: number }[];
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: string;
  status: string;
  createdAt: Schema.Types.Date;
  totalPrice: number;
}
