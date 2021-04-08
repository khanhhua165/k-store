import { CHANGE_LANGUAGE } from "../constants/ActionTypes";

interface AppState {
  lang: string;
}

interface AppAction {
  type: string;
}

const initialState = {
  lang: "en",
};
const appReducer = (
  state: AppState = initialState,
  action: AppAction
): AppState => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      const newLang = state.lang === "en" ? "vi" : "en";
      return { ...state, lang: newLang };
    default:
      return state;
  }
};

export default appReducer;
