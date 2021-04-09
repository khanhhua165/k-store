import { ICategory } from "./category.interface";
import { model, Schema } from "mongoose";

const categorySchema: Schema = new Schema({
  name: { type: String, required: true },
});

export default model<ICategory>("ProductType", categorySchema);
