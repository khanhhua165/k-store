import { IProduct } from "./product.interface";
import express, { NextFunction, Request, Response } from "express";
import HttpError from "../../exceptions/httpError";
import Controller from "../../interfaces/controller.interface";
import productModel from "./product.model";
import validationMiddleware from "../../middlewares/validation.middleware";
import AddProductDto from "./product.dto";
import authMiddleware from "../../middlewares/auth.middleware";
import fileUpload from "../../middlewares/file-upload.middleware";

export default class ProductsController implements Controller {
  public path = "/products";
  public router = express.Router();
  private product = productModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllProducts);
    this.router.get(`${this.path}/:id`, this.getProductById);
    this.router.post(
      this.path,
      authMiddleware,
      fileUpload.single("image"),
      validationMiddleware(AddProductDto),
      this.addProduct
    );
    this.router.patch(
      `${this.path}/:id`,
      authMiddleware,
      validationMiddleware(AddProductDto, true),
      this.modifyProduct
    );
    this.router.delete(
      `${this.router}/:id`,
      authMiddleware,
      this.deleteProduct
    );
  }

  private getAllProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
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
  };

  private getProductById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    try {
      const product = await this.product.findById(id);
      if (!product) {
        const error = new HttpError(204, "Product not found");
        return next(error);
      }
      res.status(200).json({ product });
    } catch (e: unknown) {
      return next(new HttpError());
    }
  };

  private addProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { name, description, productType, subType, price, stock }: IProduct =
      req.body;
    const createdProduct = new this.product({
      name,
      description,
      productType,
      subType,
      price: +price,
      stock: +stock,
      sold: 0,
      image: req.file.path,
    });
    try {
      const savedProduct = await createdProduct.save();
      res.status(201).json({ product: savedProduct });
    } catch (e: unknown) {
      return next(new HttpError());
    }
  };

  private modifyProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    const productData: IProduct = req.body;
    try {
      const updatedProduct = await this.product.findByIdAndUpdate(
        id,
        productData,
        { new: true }
      );
      if (!updatedProduct) {
        const error = new HttpError(404, "Product not found");
        return next(error);
      }
      res.status(200).json({ product: updatedProduct });
    } catch (e: unknown) {
      return next(new HttpError());
    }
  };

  private deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    try {
      const deletedProduct = await this.product.findByIdAndDelete(id);
      if (!deletedProduct) {
        const error = new HttpError(404, "Product not found");
        return next(error);
      }
      res.status(200).json({ product: deletedProduct });
    } catch (e: unknown) {
      return next(new HttpError());
    }
  };
}
