import { Types } from "mongoose";
import express, { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import sgMail from "@sendgrid/mail";
import Controller from "../../interfaces/controller.interface";
import { StripeCheckout } from "./order.interface";
import orderModel from "./order.model";
import HttpError from "../../exceptions/httpError";
import userModel from "../users/user.model";
import RequestWithUserId from "../../interfaces/requestWithUserId.interface";
import authMiddleware from "../../middlewares/auth.middleware";
import adminAuthMiddleware from "../../middlewares/adminAuth.middleware";

const stripe = new Stripe(process.env.STRIPE_SECRET_TEST!, {
  apiVersion: "2020-08-27",
  protocol: "https",
});
sgMail.setApiKey(process.env.SENDGRID_KEY!);
export default class OrderController implements Controller {
  public path = "/order";
  public router = express.Router();
  private order = orderModel;
  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      this.path,
      authMiddleware,
      adminAuthMiddleware,
      this.getOrders
    );
    this.router.post(`${this.path}/stripe`, this.stripeCheckout);
    this.router.post(`${this.path}/cod`, this.CODCheckout);
    this.router.get(`${this.path}/:id`, this.getOrder);
    this.router.patch(
      `${this.path}`,
      authMiddleware,
      adminAuthMiddleware,
      this.updateOrderStatus
    );
  }

  private getOrders = async (
    req: RequestWithUserId,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const allOrders = await this.order
        .find({})
        .select("totalPrice createdAt isPaid isDelivered");
      if (!allOrders) {
        return next(new HttpError(404, "No Order found"));
      }
      res.status(200).json({ orders: allOrders });
    } catch (e: unknown) {
      return next(new HttpError());
    }
  };

  private getOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const orderCode: string = req.params.id;
    try {
      const order = await this.order.findById(orderCode);
      if (!order) {
        return next(new HttpError(404, "No order found"));
      }
      res.status(200).json({ order });
    } catch (e: unknown) {
      return next(new HttpError());
    }
  };

  private updateOrderStatus = async (
    req: RequestWithUserId,
    res: Response,
    next: NextFunction
  ) => {
    const {
      isDelivered,
      isPaid,
      id,
    }: { isDelivered: boolean; isPaid: boolean; id: string } = req.body;
    try {
      const updatedOrder = await this.order.findByIdAndUpdate(
        id,
        { isDelivered, isPaid },
        { new: true }
      );
      if (!updatedOrder) {
        return next(new HttpError(404, "No Order found"));
      }
      res.status(201).json(updatedOrder);
    } catch (e: unknown) {
      return next(new HttpError());
    }
  };

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
        ...(userId && { user: new Types.ObjectId(userId) }),
      });
      const newOrder = await order.save();
      const msg = {
        to: email, // Change to your recipient
        from: "huukhanh.hua@gmail.com", // Change to your verified sender
        subject: "Order Success",
        html: `<p>Please save this order code: <strong>${newOrder._id}</strong></p>`,
      };
      await sgMail.send(msg);
      if (userId) {
        await this.user.findByIdAndUpdate(
          userId,
          {
            $push: {
              orders: {
                orderId: newOrder._id,
                orderDate: newOrder.createdAt,
                orderTotal: newOrder.totalPrice,
              },
            },
          },
          { upsert: true, new: true }
        );
      }
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
        ...(userId && { user: new Types.ObjectId(userId) }),
      });
      const newOrder = await order.save();
      const msg = {
        to: email, // Change to your recipient
        from: "huukhanh.hua@gmail.com", // Change to your verified sender
        subject: "Order Success",
        html: `<p>Please save this order code: <strong>${newOrder._id}</strong></p>`,
      };
      await sgMail.send(msg);
      if (userId) {
        await this.user.findByIdAndUpdate(
          userId,
          {
            $push: {
              orders: {
                orderId: newOrder._id,
                orderDate: newOrder.createdAt,
                orderTotal: newOrder.totalPrice,
              },
            },
          },
          { upsert: true, new: true }
        );
      }
      res.status(200).json({ orderId: newOrder._id });
    } catch (e: unknown) {
      return next(new HttpError());
    }
  };
}
