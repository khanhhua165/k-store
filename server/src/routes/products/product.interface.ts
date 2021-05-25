import { Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  productType: "meat" | "organ" | "supplement" | "package";
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
    | "Honey"
    | "Fat";
  image: string;
  price: number;
  stock: number;
  sold: number;
}
