import { Review } from "./Review.interface";

export interface Product {
  _id: string;
  name: string;
  description: string;
  productType: string;
  size: string;
  image: string;
  price: number;
  stock: number;
  sold: string;
  reviews: Review[];
  rating: number;
  numReviews: number;
}

export interface ProductCartItem {
  product: Product;
  quantity: number;
  totalPrice: number;
}

export interface CartResponse {
  userId: string;
  items: ProductCartItem[];
  totalPrice: number;
  totalItem: number;
}
