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
import login from './login/slice';
import role from './role/slice';
import pagination from './paginationSlice';
import permission from './backend/permission/slice'
import brand from './brand/slice'
import category from './category/slice'
import testLayout2 from './testLayout2/slice'
import signin from './signin/slice'

const rootReducer = combineReducers({
  header,
  login,
  role,
  pagination,
  permission,
  brand,
  category,
  testLayout2,
  signin
});

const persistConfig = {
  key: 'root',
  storage,
  // Optionally, you can whitelist or blacklist specific reducers
  // blacklist: ['login'] 
  // whitelist: ['login'] // only 'login' slice will be persisted
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
