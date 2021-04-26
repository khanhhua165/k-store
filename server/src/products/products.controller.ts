import express from "express";
import Controller from "../interfaces/controller.interface";
import productModel from "./product.model";

class ProductsController implements Controller {
  public path = "/categories";
  public router = express.Router();
  private product = productModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {}
}
