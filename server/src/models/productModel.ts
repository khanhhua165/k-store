import { Schema, model, Document, Model } from "mongoose";

export interface IProduct extends Document {
  name_en: string;
  name_vn: string;
  description_en: string;
  description_vi: string;
  productType: string;
  image: string;
  price: number;
  stock: number;
}

const ProductSchema: Schema = new Schema({
  name_en: { type: String, required: true },
  name_vn: { type: String, required: true },
  description_en: { type: String, required: true },
  description_vi: { type: String, required: true },
  productType: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

export default model<IProduct>("Product", ProductSchema);
