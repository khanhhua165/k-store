import { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  user: string;
  order: {
    items: { product: string; quantity: number; totalPrice: number }[];
    totalPrice: number;
    totalItem: number;
  };
  name: string;
  address: string;
  email: string;
  phone: string;
  createdAt: Schema.Types.Date;
  isPaid: boolean;
  isDelivered: boolean;
  note: string;
}
