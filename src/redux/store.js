import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { combineReducers } from 'redux';
import { filtersReducer } from "./filterSlice";
import storage from 'redux-persist/lib/storage';

import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsSlice';

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
  filter: filtersReducer,
  contacts: contactsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store)