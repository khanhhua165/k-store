import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../constants/ActionTypes";
import { UserPayload, UserState } from "../interfaces/User.interface";

const initialState = { user: null, loaded: false };
const userReducer = (
  state: UserState = initialState,
  action: { type: string; payload: UserPayload }
): UserState => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return { ...state, user: action.payload.user, loaded: true };
    }
    case LOGOUT_SUCCESS: {
      return { ...state, user: null, loaded: false };
    }
    default:
      return state;
  }
};

export default userReducer;
