import express, { Response, NextFunction } from "express";
import HttpError from "../../exceptions/httpError";
import Controller from "../../interfaces/controller.interface";
import RequestWithUserId from "../../interfaces/requestWithUserId.interface";
import authMiddleware from "../../middlewares/auth.middleware";
import { ICart } from "./cart.interface";
import cartModel from "./cart.model";

export default class CartController implements Controller {
  public path = "/cart";
  public router = express.Router();
  private cart = cartModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(authMiddleware);
    this.router.get(this.path, this.getCartByUserId);
    this.router.patch(this.path, this.updateCart);
    this.router.delete(this.path, this.clearCart);
  }

  private getCartByUserId = async (
    req: RequestWithUserId,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.userId;
    try {
      const userCart = await this.cart.findOne({ userId }).exec();
      res.status(200).json({ userCart });
    } catch (e: unknown) {
      return next(new HttpError());
    }
  };

  private updateCart = async (
    req: RequestWithUserId,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.userId;
    const cartData: ICart = req.body;
    try {
      const updatedCart = await this.cart.findOneAndUpdate(
        { userId },
        cartData,
        {
          new: true,
        }
      );
      res.status(200).json({ userCart: updatedCart });
    } catch (e: unknown) {
      return next(new HttpError());
    }
  };
  private clearCart = async (
    req: RequestWithUserId,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.userId;
    try {
      const currentCart = await this.cart.findOne({ userId }).exec();
      currentCart!.items = [];
      await currentCart!.save();
    } catch (e: unknown) {
      return next(new HttpError());
    }
  };
}
