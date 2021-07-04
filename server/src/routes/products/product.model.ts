import { Schema, model } from "mongoose";
import { IProduct } from "./product.interface";

const reviewSchema: Schema = new Schema(
  {
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  productType: {
    type: String,
    required: true,
  },
  size: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  sold: { type: Number, required: true, default: 0 },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default model<IProduct>("Product", productSchema);
