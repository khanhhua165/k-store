import { IOrder } from "./../orders/order.interface";
import { Document } from "mongoose";
import { IProduct } from "../products/product.interface";

export interface IUser extends Document {
  name: string;
  password: string;
  email: string;
  addrress?: string;
  phone?: string;
  favorite: string[];
}
