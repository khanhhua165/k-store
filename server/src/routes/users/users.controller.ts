import { IUser } from "./user.interface";
import express, { Request, Response, NextFunction } from "express";
import Controller from "../../interfaces/controller.interface";
import userModel from "./user.model";
import bcrypt from "bcrypt";
import CreateUserDto from "./createUser.dto";
import HttpError from "../../exceptions/httpError";
import validationMiddleware from "../../middlewares/validation.middleware";
import LogInDto from "./logIn.dto";
import TokenData from "../../interfaces/tokenData.interface";
import DataStoredInToken from "../../interfaces/dataStoredInToken";
import jwt from "jsonwebtoken";
import cartModel from "../cart/cart.model";
import RequestWithUserId from "../../interfaces/requestWithUserId.interface";
import authMiddleware from "../../middlewares/auth.middleware";

export default class UsersController implements Controller {
  public path = "/user";
  public router = express.Router();
  private user = userModel;
  private cart = cartModel;
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(CreateUserDto),
      this.registration
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LogInDto),
      this.loggingIn
    );
    this.router.patch(`${this.path}/:id`, authMiddleware, this.updateUser);
  }

  private registration = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userData: CreateUserDto = req.body;
    if (await this.user.findOne({ email: userData.email })) {
      return next(new HttpError(400, "User with that email already exists"));
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.user.create({
      ...userData,
      password: hashedPassword,
      favorite: [],
    });
    await this.cart.create({
      userId: user._id,
      items: [],
      totalPrice: 0,
      totalItem: 0,
    });
    const tokenData = this.createToken(user);
    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      token: tokenData.token,
    });
  };

  private loggingIn = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const logInData: LogInDto = req.body;
    const user = await this.user.findOne({ email: logInData.email });
    if (!user) {
      return next(new HttpError(401, "Wrong credentials provided"));
    }
    const isPasswordMatching = await bcrypt.compare(
      logInData.password,
      user.password
    );
    if (!isPasswordMatching) {
      return next(new HttpError(401, "Wrong credentials provided"));
    }
    user.password = "";
    const tokenData = this.createToken(user);
    res.status(200).json({ user, token: tokenData.token });
  };

  private updateUser = async (
    req: RequestWithUserId,
    res: Response,
    next: NextFunction
  ) => {
    const { name, city, state, address, phone }: IUser = req.body;
    const { userId } = req;
    try {
      const updatedUser = await this.user.findByIdAndUpdate(
        userId,
        { name, city, state, address, phone },
        { new: true }
      );
      updatedUser!.password = "";
      res.status(200).json({ user: updatedUser });
    } catch (e: unknown) {
      return next(new HttpError());
    }
  };

  private createToken(user: IUser): TokenData {
    const expiresIn = 60 * 60;
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret!, { expiresIn }),
    };
  }
}
