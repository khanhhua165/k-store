import { PRODUCTS_PER_PAGE } from "./../../constants/product";
import { getTitle } from "./../../helpers/slugToTitle";
import { CreateProductReview, IProduct } from "./product.interface";
import express, { NextFunction, Request, Response } from "express";
import HttpError from "../../exceptions/httpError";
import Controller from "../../interfaces/controller.interface";
import productModel from "./product.model";
import validationMiddleware from "../../middlewares/validation.middleware";
import AddProductDto from "./product.dto";
import authMiddleware from "../../middlewares/auth.middleware";
import fileUpload from "../../middlewares/file-upload.middleware";
import RequestWithUserId from "../../interfaces/requestWithUserId.interface";
import mongoose from "mongoose";

export default class ProductsController implements Controller {
  public path = "/products";
  public router = express.Router();
  private product = productModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllProducts);
    this.router.get(`${this.path}/type/:type`, this.getProductsByType);
    this.router.get(`${this.path}/:id`, this.getProductById);
    this.router.post(
      this.path,
      authMiddleware,
      fileUpload.single("image"),
      validationMiddleware(AddProductDto),
      this.addProduct
    );

    this.router.post(
      `${this.path}/review`,
      authMiddleware,
      this.createProductReview
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
    const currentPage = +req.query.page!;
    const searchString = req.query.search
      ? { name: { $regex: req.query.search as string, $options: "i" } }
      : {};
    if (Number.isNaN(currentPage)) {
      return next(new HttpError(400, "Query is wrong!!"));
    }
    try {
      const productCount = await this.product
        .find({ ...searchString })
        .countDocuments();
      if (productCount === 0) {
        const error = new HttpError(404, "Couldn't find any products");
        return next(error);
      }
      const allProducts = await this.product
        .find({ ...searchString })
        .skip((currentPage - 1) * PRODUCTS_PER_PAGE)
        .limit(PRODUCTS_PER_PAGE);
      if (!allProducts) {
        const error = new HttpError(404, "Couldn't find any products");
        return next(error);
      }
      const totalPage = Math.ceil(productCount / PRODUCTS_PER_PAGE);
      res.status(200).json({ products: allProducts, totalPage });
    } catch (e: unknown) {
      return next(new HttpError());
    }
  };

  private getProductsByType = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const type = req.params.type;
    const currentPage = +req.query.page!;
    if (Number.isNaN(currentPage)) {
      return next(new HttpError(400, "Query is wrong!!"));
    }
    try {
      const productCount = await this.product
        .find({ productType: getTitle(type) })
        .countDocuments();
      if (productCount === 0) {
        const error = new HttpError(404, "Couldn't find any products");
        return next(error);
      }
      const products = await this.product
        .find({ productType: getTitle(type) })
        .skip((currentPage - 1) * PRODUCTS_PER_PAGE)
        .limit(PRODUCTS_PER_PAGE);
      if (!products) {
        const error = new HttpError(404, "Couldn't find any products");
        return next(error);
      }
      const totalPage = Math.ceil(productCount / PRODUCTS_PER_PAGE);
      res.status(200).json({ products, totalPage });
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
    const { name, description, productType, size, price, stock }: IProduct =
      req.body;
    const createdProduct = new this.product({
      name,
      description,
      productType,
      size,
      price: +price,
      stock: +stock,
      image: req.file.path,
    });
    try {
      const savedProduct = await createdProduct.save();
      res.status(201).json({ product: savedProduct });
    } catch (e: unknown) {
      return next(new HttpError());
    }
  };

  private createProductReview = async (
    req: RequestWithUserId,
    res: Response,
    next: NextFunction
  ) => {
    const { rating, comment, productId }: CreateProductReview = req.body;
    try {
      const product = await this.product.findById(productId);
      if (!product) {
        return next(new HttpError(4004, "Product not Found"));
      }
      const alreadyReviewed = product.reviews.find(
        (review) => review.user.toString() === req.userId
      );
      if (alreadyReviewed) {
        return next(new HttpError(400, "Product already reviewed"));
      }
      const newReview = {
        rating: +rating,
        comment,
        user: mongoose.Types.ObjectId(req.userId!),
        name: req.name!,
      };
      product.reviews.push(newReview);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
      await product.save();
      res.status(201).json({ message: "Review added" });
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
