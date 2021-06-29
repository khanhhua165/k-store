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

interface CartOrder {
  product: {
    name: string;
    description: string;
    productType: string;
    size: string;
    image: string;
    price: string;
  };
  quantity: number;
  totalPrice: string;
}

export interface StripeCheckout {
  id: string;
  amount: number;
  cart: CartOrder[];
  userId: string;
  totalPrice: number;
  totalItem: number;
  name: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  address: string;
}
