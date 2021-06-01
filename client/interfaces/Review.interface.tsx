import { User } from "./User.interface";

export interface Review {
  user: User;
  rating: number;
  comment: string;
}
