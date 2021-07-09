import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  city: { type: String },
  state: { type: String },
  address: { type: String },
  phone: { type: String },
  isAdmin: { type: Boolean, required: true, default: false },
  orders: [
    {
      orderId: { type: String, required: true },
      orderDate: { type: Date, required: true },
      orderTotal: { type: Number, required: true },
    },
  ],
  recoveryCode: { type: String },
  recoveryCodeExpiration: { type: Date },
});

export default model<IUser>("User", UserSchema);
