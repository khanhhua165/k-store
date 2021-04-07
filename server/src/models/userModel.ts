import { IProduct } from "./productModel";
import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  email: string;
  addrress?: string;
  phone: number;
  favorite: IProduct["_id"][];
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String },
  phone: { type: Number },
  favorite: [{ type: Schema.Types.ObjectId, ref: "Product", unique: true }],
});

export default model<IUser>("User", UserSchema);
