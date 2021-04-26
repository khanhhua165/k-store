import { Document } from "mongoose";
import { IProduct } from "../products/product.interface";
import { IUser } from "../users/user.interface";

export interface ICart extends Document {
  userId: IUser["_id"];
  items: { productId: IProduct["_id"]; quantity: number }[];
  totalPrice: number;
}
