import { Schema, Document } from "mongoose";
import { IProduct } from "../products/product.interface";
import { IUser } from "../users/user.interface";

export interface IOrder extends Document {
  userId: string;
  items: { productId: string; quantity: number }[];
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: string;
  status: string;
  createdAt: Schema.Types.Date;
  totalPrice: number;
}
