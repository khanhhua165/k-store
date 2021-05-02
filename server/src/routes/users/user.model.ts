import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
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
});

export default model<IUser>("User", UserSchema);
