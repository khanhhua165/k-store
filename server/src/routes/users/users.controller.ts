import { IPasswordChange, IUser } from "./user.interface";
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
import RequestWithUserId from "../../interfaces/requestWithUserId.interface";
import authMiddleware from "../../middlewares/auth.middleware";
import UpdateUserDto from "./updateUser.dto";
import PasswordChangeDto from "./passwordChange.dto";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_KEY!);

const TTL_IN_MILISECOND = 600000;
export default class UsersController implements Controller {
  public path = "/user";
  public router = express.Router();
  private user = userModel;
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

    this.router.patch(
      `${this.path}/update`,
      authMiddleware,
      validationMiddleware(UpdateUserDto),
      this.updateUser
    );

    this.router.post(`${this.path}/password-recovery`, this.passwordReset);

    this.router.get(
      `${this.path}/password-recovery/:code`,
      this.getResetPasswordRequest
    );

    this.router.get(`${this.path}/orders`, authMiddleware, this.getUserOrders);

    this.router.post(
      `${this.path}/password-recovery/reset`,
      this.getNewPassword
    );

    this.router.patch(
      `${this.path}/password-change`,
      authMiddleware,
      validationMiddleware(PasswordChangeDto),
      this.changePassword
    );
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
      orders: [],
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

  private changePassword = async (
    req: RequestWithUserId,
    res: Response,
    next: NextFunction
  ) => {
    const { newPassword, password }: IPasswordChange = req.body;
    const { userId } = req;
    try {
      const user = await this.user.findById(userId);
      if (!user) {
        return next(new HttpError(401, "Wrong credentials provided"));
      }
      const isPasswordMatching = await bcrypt.compare(password, user.password);
      if (!isPasswordMatching) {
        return next(new HttpError(401, "Wrong credentials provided"));
      }
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
      user.password = "";
      res.status(200).json({ user });
    } catch (e: unknown) {
      return next(new HttpError());
    }
  };

  private passwordReset = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const email: string = req.body.email;
    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        return next(new HttpError());
      }
      const code = buffer.toString("hex");
      try {
        const user = await this.user.findOne({ email });
        if (!user) {
          return next(new HttpError(404, "Wrong credentials provided"));
        }
        user.recoveryCode = code;
        user.recoveryCodeExpiration = Date.now() + TTL_IN_MILISECOND;
        await user.save();
        const msg = {
          to: email, // Change to your recipient
          from: "huukhanh.hua@gmail.com", // Change to your verified sender
          subject: "Password Reset",
          html: `
            <p>You requested a password reset from V-mart</p>
            <p>Click this <a href="${process.env
              .CLIENT_URL!}/password-recovery/${code}">link</a> to set a new password.</p>
          `,
        };
        await sgMail.send(msg);
        res.status(200).json({ message: "successful" });
      } catch (e: unknown) {
        return next(new HttpError());
      }
    });
  };

  private getResetPasswordRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const code: string = req.params.code;
    try {
      const user = await this.user.findOne({
        recoveryCode: code,
        recoveryCodeExpiration: { $gt: Date.now() },
      });
      if (!user) {
        return next(new HttpError(402, "No user found or code expired"));
      }
      res.status(200).json({ message: "success" });
    } catch (e: unknown) {
      return next(new HttpError());
    }
  };

  private getNewPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const code: string = req.body.code;
    const newPassword: string = req.body.newPassword;
    try {
      const user = await this.user.findOne({
        recoveryCode: code,
        recoveryCodeExpiration: { $gt: Date.now() },
      });
      if (!user) {
        return next(new HttpError(404, "Time expired, PLease do it again"));
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.recoveryCode = "";
      await user.save();
      res.status(200).json({ message: "successful" });
    } catch (e) {
      return next(new HttpError());
    }
  };

  private getUserOrders = async (
    req: RequestWithUserId,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.userId;
    try {
      const user = await this.user.findById(userId);
      if (!user) {
        return next(new HttpError(404, "Token expired, please try again"));
      }
      res.status(200).json({ orders: user.orders });
    } catch (e: unknown) {
      return next(new HttpError());
    }
  };

  private createToken(user: IUser): TokenData {
    const expiresIn = 60 * 60;
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
      name: user.name,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret!, { expiresIn }),
    };
  }
}
