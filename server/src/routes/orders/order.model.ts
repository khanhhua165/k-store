import { model, Schema } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  cart: [
    {
      product: {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        productType: {
          type: String,
          required: true,
        },
        size: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
      },
      quantity: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  totalItem: { type: Number, required: true },
  name: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isPaid: { type: Boolean, required: true, default: false },
  isDelivered: { type: Boolean, required: true, default: false },
});

export default model<IOrder>("Order", orderSchema);
