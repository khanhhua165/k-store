import { ICategory } from "./../categories/category.interface";
import { Document } from "mongoose";

export interface IProduct extends Document {
  name_en: string;
  name_vn: string;
  description_en: string;
  description_vi: string;
  productType: ICategory["_id"];
  image: string;
  price: number;
  stock: number;
}
