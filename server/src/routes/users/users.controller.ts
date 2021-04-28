import express, { Request, Response, NextFunction } from "express";
import Controller from "../../interfaces/controller.interface";
import userModel from "./user.model";
import bcrypt from "bcrypt";
import CreateUserDto from "./createUser.dto";
import HttpError from "../../exceptions/httpError";

export default class UsersController implements Controller {
  public path = "/user";
  public router = express.Router();
  private user = userModel;
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {}

  private registration = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userData: CreateUserDto = req.body;
    if (await this.user.findOne({ email: userData.email })) {
      next(new HttpError(400, "User with that email already exists"));
    } else {
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      const user = await this.user.create({
        ...userData,
        password: hashedPassword,
      });
      user.password = "";
      res.status(201).json({ user });
    }
  };
}
