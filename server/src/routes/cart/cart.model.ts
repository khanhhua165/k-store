import { ICart } from "./cart.interface";
import { model, Schema } from "mongoose";

const OrderSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
});

export default model<ICart>("Cart", OrderSchema);
