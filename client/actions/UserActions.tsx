import { SignUpInputs } from "../components/forms/SignUpForm";
import {
  LOGIN_ATTEMPT,
  LOGIN_SUCCESS,
  SIGNUP_ATTEMPT,
} from "../constants/ActionTypes";
import { User } from "../interfaces/User.interface";

export const loginSuccess = (user: User) => ({
  type: LOGIN_SUCCESS,
  payload: { user },
});

export const startSignup = (signUpInfo: SignUpInputs) => ({
  type: SIGNUP_ATTEMPT,
  payload: signUpInfo,
});
