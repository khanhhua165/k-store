import express from "express";
import categoryModel from "../categories/category.model";
import Controller from "../interfaces/controller.interface";
import productModel from "./product.model";

class ProductsController implements Controller {
  public path = "/categories";
  public router = express.Router();
  private category = categoryModel;
  private product = productModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {}
}
