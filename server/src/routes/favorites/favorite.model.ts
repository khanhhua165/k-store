import { IFavorite } from "./favorite.interface";
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
    },
  ],
});

export default model<IFavorite>("Favorite", OrderSchema);
