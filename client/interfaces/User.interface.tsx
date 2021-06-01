export interface User {
  _id: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
  password?: string;
  isAdmin: boolean;
}

export interface UserSignupResponse {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}
export interface SignupResponse {
  user: UserSignupResponse;
  token: string;
}

export interface SigninResponse {
  user: User;
  token: string;
}
