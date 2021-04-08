import { Request, Response, NextFunction } from "express";
import HttpError from "../models/httpError";
import ProductType from "../models/productTypeModel";

export const findAllTypes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allTypes = await ProductType.find();
    if (!allTypes) {
      const error = new HttpError(
        "Currently there is no product in the store",
        204
      );
      return next(error);
    }
    return res.status(200).json({ types: allTypes });
  } catch (err: unknown) {
    const err = new HttpError(
      "There was an unexpected error in getting product types",
      500
    );
    return next(err);
  }
};
