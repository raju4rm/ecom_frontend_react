// File: src/app/store.js

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import { 
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
 } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import header from './backend/header/slice';
import permission from './backend/permission/slice';
import login from './login/slice';

const rootReducer = combineReducers({
  header,
  permission,
  login
});

const persistConfig = {
  key: 'root',
  storage,
  // Optionally, you can whitelist or blacklist specific reducers
  whitelist: ['login'] // only 'login' slice will be persisted
  // blacklist: ['header', 'permission'] // 'header' and 'permission' slices won't be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
