import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import HttpError from "../exceptions/httpError";
import DataStoredInToken from "../interfaces/dataStoredInToken";
import RequestWithUserId from "../interfaces/requestWithUserId.interface";
import userModel from "../routes/users/user.model";

export default async function authMiddleware(
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
    const user = await userModel.findById(decodedToken._id);
    if (!user) {
      return next(new HttpError(401, "Authentication failed"));
    }
    req.userId = decodedToken._id;
    req.name = decodedToken.name;
    req.isAdmin = decodedToken.isAdmin;
    next();
  } catch (e: unknown) {
    return next(new HttpError(401, "Authentication failed"));
  }
}
