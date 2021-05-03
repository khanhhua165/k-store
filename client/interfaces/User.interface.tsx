export interface User {
  _id: string;
  name: string;
  favorite: string[];
}

export interface UserState {
  user: User | null;
  loaded: boolean;
}
export interface UserPayload {
  user: User;
  name: string;
}

export interface UserSignupResponse {
  _id: string;
  name: string;
  password: string;
  email: string;
  addrress?: string;
  phone?: string;
  favorite: string[];
}
export interface SignupResponse {
  user: UserSignupResponse;
  tokenData: string;
}
