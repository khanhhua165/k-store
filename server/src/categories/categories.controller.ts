import express, { Request, Response, NextFunction } from "express";
import HttpError from "../exceptions/httpError";
import Controller from "../interfaces/controller.interface";
import categoryModel from "./category.model";

class CategoriesController implements Controller {
  public path = "/categories";
  public router = express.Router();
  private category = categoryModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllCategories);
  }

  private getAllCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const allCategories = await this.category.find();
      return res.status(200).json({ allCategories });
    } catch (e: unknown) {
      const error = new HttpError(
        "There was a problem when fetching data, try again",
        500
      );
      return next(error);
    }
  };
}

export default CategoriesController;
