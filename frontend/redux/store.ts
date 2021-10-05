import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './AuthSlice';
import { gameSlice } from './GameSlice';
//import { userSlice } from './UserSlice';
import { userSlice } from './NewUserSlice';

import { setupListeners } from '@reduxjs/toolkit/query';
import { signUpUserApi } from '../Services/UserService';


export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    game: gameSlice.reducer,
    [signUpUserApi.reducerPath]: signUpUserApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(signUpUserApi.middleware),
});

setupListeners(store.dispatch)
