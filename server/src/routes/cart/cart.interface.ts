import { Document } from "mongoose";

export interface ICart extends Document {
  userId: string;
  items: { product: string; quantity: number; totalPrice: number }[];
  totalPrice: number;
  totalItem: number;
}
