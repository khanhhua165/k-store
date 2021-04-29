import { Document } from "mongoose";

export interface ICart extends Document {
  userId: string;
  items: { productId: string; quantity: number }[];
  totalPrice: number;
}
