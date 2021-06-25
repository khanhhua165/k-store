import { ICart } from "./cart.interface";
import { model, Schema } from "mongoose";

const CartSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  totalItem: { type: Number, required: true },
});

export default model<ICart>("Cart", CartSchema);
