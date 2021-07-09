import { ProductCartItem } from "./Product.interface";

export interface OrderSuccessResponse {
  orderId: string;
}
export interface OrderResponse {
  cart: ProductCartItem[];
  _id: string;
  totalPrice: number;
  totalItem: number;
  name: string;
  state: string;
  city: string;
  address: string;
  phone: string;
  createdAt: string;
  isPaid: boolean;
  isDelivered: boolean;
  email: string;
}

export interface UserOrderResponse {
  orderId: string;
  orderDate: string;
  orderTotal: number;
}
