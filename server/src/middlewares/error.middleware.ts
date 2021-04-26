import { NextFunction, Request, Response } from "express";
import HttpError from "../exceptions/httpError";

const errorMiddleware = (
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code).json({ message: error.message });
};

export default errorMiddleware;
