import { Schema, model, Document, Model } from "mongoose";

export interface IProductType extends Document {
  productType: string;
}

const ProductTypeSchema: Schema = new Schema({
  productType: { type: String, required: true },
});

export default model<IProductType>("ProductType", ProductTypeSchema);
