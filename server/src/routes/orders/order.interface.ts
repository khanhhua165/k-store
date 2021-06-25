import { IProduct } from "./../products/product.interface";
import { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  user?: string;
  cart: { product: string; quantity: number; totalPrice: number }[];
  totalItem: number;
  totalPrice: number;
  name: string;
  state: string;
  city: string;
  address: string;
  email: string;
  phone: string;
  createdAt: Schema.Types.Date;
  isPaid: boolean;
  isDelivered: boolean;
}

export interface StripeCheckout {
  id: string;
  amount: number;
  cart: { productId: string; quantity: number; totalPrice: number }[];
  userId?: string;
  totalPrice: number;
  totalItem: number;
  name: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  address: string;
}
