import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

const middleWares = [
  process.env.NODE_ENV !== "production" && logger
].filter(Boolean);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(middleWares)
});
