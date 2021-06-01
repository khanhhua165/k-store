import { Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  productType:
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
    | "Fat"
    | "Organ"
    | "Supplement"
    | "Package";
  image: string;
  reviews: string[];
  size: string;
  price: number;
  stock: number;
  sold: number;
  rating: number;
  numReviews: number;
}
