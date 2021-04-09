import { Schema, model } from "mongoose";
import { IProduct } from "./product.interface";

const productSchema: Schema = new Schema({
  name_en: { type: String, required: true },
  name_vn: { type: String, required: true },
  description_en: { type: String, required: true },
  description_vn: { type: String, required: true },
  productType: {
    type: Schema.Types.ObjectId,
    ref: "ProductType",
    required: true,
  },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

export default model<IProduct>("Product", productSchema);
