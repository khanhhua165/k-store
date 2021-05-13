export interface User {
  _id: string;
  name: string;
  address?: string;
  phone?: string;
}

interface TokenData {
  expiresIn: number;
  token: string;
}

export interface UserSignupResponse {
  _id: string;
  name: string;
  password: string;
  email: string;
}
export interface SignupResponse {
  user: UserSignupResponse;
  tokenData: TokenData;
}
