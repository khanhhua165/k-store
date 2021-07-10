import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import HttpError from "../exceptions/httpError";
import DataStoredInToken from "../interfaces/dataStoredInToken";
import RequestWithUserId from "../interfaces/requestWithUserId.interface";

export default function authMiddleware(
  req: RequestWithUserId,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization!.split(" ")[1];
    if (!token) {
      return next(new HttpError(401, "Authentication failed"));
    }
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as DataStoredInToken;
    req.userId = decodedToken._id;
    req.name = decodedToken.name;
    next();
  } catch (e: unknown) {
    return next(new HttpError(401, "Authentication failed"));
  }
}
