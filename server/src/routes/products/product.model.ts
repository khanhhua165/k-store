import { productTypes, subTypes } from "../../constants/productTypes";
import { Schema, model } from "mongoose";
import { IProduct } from "./product.interface";

const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  productType: {
    type: String,
    enum: productTypes,
    required: true,
  },
  subType: { type: String, enum: subTypes, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  sold: { type: Number, required: true },
});

export default model<IProduct>("Product", productSchema);
