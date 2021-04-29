import { Document } from "mongoose";

export interface IFavorite extends Document {
  userId: string;
  items: { productId: string }[];
}
