import { createStore } from "redux";
import { sessionReducer } from "./sessionReducer";

const store = createStore(sessionReducer);

export default store;
