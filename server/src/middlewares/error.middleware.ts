import { NextFunction, Request, Response } from "express";
import fs from "fs";
import HttpError from "../exceptions/httpError";

const errorMiddleware = (
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code).json({ message: error.message });
};

export default errorMiddleware;
