import mongoose from "mongoose";
import express, { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import sgMail from "@sendgrid/mail";
import Controller from "../../interfaces/controller.interface";
import { StripeCheckout } from "./order.interface";
import orderModel from "./order.model";
import HttpError from "../../exceptions/httpError";

const stripe = new Stripe(process.env.STRIPE_SECRET_TEST!, {
  apiVersion: "2020-08-27",
  protocol: "https",
});
sgMail.setApiKey(process.env.SENDGRID_KEY!);
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
    this.router.post(`${this.path}/search-order`, this.getOrder);
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

    try {
      const order = new this.order({
        cart,
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
      const msg = {
        to: email, // Change to your recipient
        from: "huukhanh.hua@gmail.com", // Change to your verified sender
        subject: "Order Success",
        html: `<p>Please save this order code: <strong>${newOrder._id}</strong></p>`,
      };
      await sgMail.send(msg);
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
      await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "Organic Meat Selling Company",
        payment_method: id,
        confirm: true,
      });
      const order = new this.order({
        cart,
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
      const msg = {
        to: email, // Change to your recipient
        from: "huukhanh.hua@gmail.com", // Change to your verified sender
        subject: "Order Success",
        html: `<p>Please save this order code: <strong>${newOrder._id}</strong></p>`,
      };
      await sgMail.send(msg);
      res.status(200).json({ orderId: newOrder._id });
    } catch (e: unknown) {
      return next(new HttpError());
    }
  };

  private getOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const orderCode: string = req.body.code;
    const email: string = req.body.email;
    try {
      const order = await this.order.findOne({ email, _id: orderCode });
      if (!order) {
        return next(new HttpError(404, "No order found"));
      }
      res.status(200).json({ order });
    } catch (e: unknown) {
      return next(new HttpError());
    }
  };
}
