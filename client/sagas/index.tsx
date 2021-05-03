import { all } from "@redux-saga/core/effects";
import { watchSignup } from "./user.saga";

export default function* rootSaga() {
  yield all([watchSignup()]);
}
