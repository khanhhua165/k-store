import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import userReducer from "../reducers/UserReducer";
import rootSaga from "../sagas";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({ trace: false });

const rootReducer = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);
export default store;
