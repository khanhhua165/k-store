import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

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
