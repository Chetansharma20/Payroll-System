import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import CompanyReducer, { logout } from "./UserSlice";
import EmployeeReducer from "./EmployeeSlice";

// 🧠 Middleware: optional session timeout (you can remove this if unnecessary)
const timeoutMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type === "auth/sessionExpired") {
    setTimeout(() => {
      store.dispatch(logout());
    }, 5000);
  }
  return result;
};

// 🔒 Persistence Config
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

// 🧩 Combine Reducers
const rootReducer = combineReducers({
  company: CompanyReducer,
  employee: EmployeeReducer,
});

// ⚙️ Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 🏗️ Configure Store
const MainStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(timeoutMiddleware),
});

// 🧱 Persistor
export const Persistor = persistStore(MainStore);
export default MainStore;
