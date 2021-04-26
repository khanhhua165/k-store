import { Document } from "mongoose";

export interface IProduct extends Document {
  name_en: string;
  name_vi: string;
  description_en: string;
  description_vi: string;
  productType: "meat" | "organ" | "supplement";
  subType:
    | "Beef Steaks"
    | "Beef Whole Cuts"
    | "Ground Beef and Burgers"
    | "Poultry"
    | "Pork"
    | "Lamb"
    | "Veal"
    | "Cheese"
    | "Fish Products"
    | "Salt"
    | "Honey";
  image: string;
  price: number;
  stock: number;
}
