import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const CartSchema: Schema = new Schema({
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
});

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String },
  phone: { type: String },
  favorite: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
      unique: true,
      required: true,
    },
  ],
  cart: CartSchema,
  order: [{ type: Schema.Types.ObjectId, ref: "Order", required: true }],
});

export default model<IUser>("User", UserSchema);
