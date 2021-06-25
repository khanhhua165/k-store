import mongoose from "mongoose";
import express, { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import Controller from "../../interfaces/controller.interface";
import { StripeCheckout } from "./order.interface";
import orderModel from "./order.model";
import HttpError from "../../exceptions/httpError";

const stripe = new Stripe(process.env.STRIPE_SECRET_TEST!, {
  apiVersion: "2020-08-27",
  protocol: "https",
});

export default class OrderController implements Controller {
  public path = "/order";
  public router = express.Router();
  private order = orderModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/stripe`, this.stripeCheckout);
    this.router.post(this.path, this.CODCheckout);
  }

  private CODCheckout = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const {
      cart,
      userId,
      address,
      city,
      email,
      name,
      phone,
      state,
      totalItem,
      totalPrice,
    }: StripeCheckout = req.body;
    const cartValue = {
      cart: cart.map(({ productId, quantity, totalPrice }) => ({
        product: new mongoose.Types.ObjectId(productId),
        quantity,
        totalPrice,
      })),
    };
    try {
      const order = new this.order({
        ...cartValue,
        totalPrice,
        totalItem,
        name,
        state,
        city,
        address,
        email,
        phone,
        ...(userId && { user: new mongoose.Types._ObjectId(userId) }),
      });
      const newOrder = await order.save();
      res.status(200).json({ orderId: newOrder._id });
    } catch (e: unknown) {
      return next(new HttpError());
    }
  };

  private stripeCheckout = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const {
      amount,
      cart,
      id,
      userId,
      address,
      city,
      email,
      name,
      phone,
      state,
      totalItem,
      totalPrice,
    }: StripeCheckout = req.body;
    try {
      const payment = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "Organic Meat Selling Company",
        payment_method: id,
        confirm: true,
      });
      const cartValue = {
        cart: cart.map(({ productId, quantity, totalPrice }) => ({
          product: new mongoose.Types.ObjectId(productId),
          quantity,
          totalPrice,
        })),
      };
      const order = new this.order({
        ...cartValue,
        totalPrice,
        totalItem,
        name,
        state,
        city,
        address,
        email,
        phone,
        isPaid: true,
        ...(userId && { user: new mongoose.Types._ObjectId(userId) }),
      });
      const newOrder = await order.save();
      res.status(200).json({ orderId: newOrder._id });
    } catch (e: unknown) {
      return next(new HttpError());
    }
  };
}
