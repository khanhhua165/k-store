import { Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  productType: string;
  image: string;
  reviews: string[];
  size: string;
  price: number;
  stock: number;
  sold: number;
  rating: number;
  numReviews: number;
}
