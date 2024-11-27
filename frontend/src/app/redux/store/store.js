import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import storage from "redux-persist/es/storage"; // Correct path
import {
  persistReducer as reduxPersistReducer,
  persistStore,
} from "redux-persist"; // Alias to avoid conflict

const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = reduxPersistReducer(persistConfig, rootReducer); // Use alias
const store = configureStore({
  reducer: persistedReducer,
  // Disable serializable check (Not recommended unless necessary)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
