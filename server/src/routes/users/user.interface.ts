import { IOrder } from "./../orders/order.interface";
import { Document } from "mongoose";
import { IProduct } from "../products/product.interface";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  addrress?: string;
  phone?: string;
  favorite: IProduct["_id"][];
  cart: {
    items: { productId: IProduct["_id"]; quantity: number }[];
    totalPrice: number;
  };
  order: IOrder["_id"][];
}
