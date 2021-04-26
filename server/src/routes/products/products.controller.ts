import { IProduct } from "./product.interface";
import express, { NextFunction, Request, Response } from "express";
import HttpError from "../../exceptions/httpError";
import Controller from "../../interfaces/controller.interface";
import productModel from "./product.model";

class ProductsController implements Controller {
  public path = "/products";
  public router = express.Router();
  private product = productModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllProducts);
    this.router.get(`${this.path}/:id`, this.getProductById);
    this.router.post(this.path, this.addProduct);
  }

  private async getAllProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const allProducts = await this.product.find();
      if (!allProducts) {
        const error = new HttpError(204, "Couldn't find any products");
        return next(error);
      }
      res.status(200).json({ products: allProducts });
    } catch (e: unknown) {
      return next(new HttpError());
    }
  }

  private async getProductById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const id = req.params.id;
    try {
      const product = this.product.findById(id);
      if (!product) {
        const error = new HttpError(204, "Product not found");
        return next(error);
      }
      res.status(200).json({ product });
    } catch (e: unknown) {
      return next(new HttpError());
    }
  }

  private async addProduct(req: Request, res: Response, next: NextFunction) {
    const productData: IProduct = req.body;
    const createdProduct = new this.product(productData);
    try {
      await createdProduct.save();
      res.status(201).json({ product: createdProduct });
    } catch (e: unknown) {
      return next(new HttpError());
    }
  }
}
