import { IProduct } from "./productModel";
import { IUser } from "./userModel";
import { Schema, model, Document } from "mongoose";

interface IOrder extends Document {
  user: IUser["_id"];
  items: { product: IProduct["_id"]; quantity: number }[];
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: string;
  status: string;
  createdAt: Schema.Types.Date;
  totalPrice: number;
}

const OrderSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  totalPrice: { type: Number, required: true },
});

export default model<IOrder>("Order", OrderSchema);
