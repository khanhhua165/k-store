import { Request } from "express";

export default interface RequestWithUserId extends Request {
  userId?: string;
  name?: string;
  isAdmin?: boolean;
}
