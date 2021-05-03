import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";
import { SignUpInputs } from "../components/forms/SignUpForm";
import { LOGIN_ATTEMPT } from "../constants/ActionTypes";
import { API_URL } from "../constants/api";
import { SignupResponse } from "../interfaces/User.interface";
import { loginSuccess } from "../actions/UserActions";

function* signupSaga({
  type,
  payload,
}: {
  type: string;
  payload: SignUpInputs;
}) {
  try {
    const userProfile: SignupResponse = yield axios.post<SignupResponse>(
      `${API_URL}/signup`,
      payload
    );
    console.log(userProfile);
    yield put(loginSuccess(userProfile.user));
  } catch (e: unknown) {
    console.log(e);
  }
}

export function* watchSignup() {
  yield takeEvery(LOGIN_ATTEMPT, signupSaga);
}
