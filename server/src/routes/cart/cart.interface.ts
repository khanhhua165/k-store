import { Document } from "mongoose";

export interface ICart extends Document {
  user: string;
  items: { product: string; quantity: number; totalPrice: number }[];
  totalPrice: number;
  totalItem: number;
}
