import { Document, Types } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  productType: string;
  image: string;
  reviews: {
    name: string;
    rating: number;
    comment: string;
    user: string | Types.ObjectId;
    createdAt?: string;
  }[];
  size: string;
  price: number;
  stock: number;
  sold: number;
  rating: number;
  numReviews: number;
}

export interface CreateProductReview {
  productId: string;
  rating: number;
  comment: string;
}

export interface IProductModify extends IProduct {
  haveImage: string;
}
