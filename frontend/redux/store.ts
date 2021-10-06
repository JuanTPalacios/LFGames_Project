import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './AuthSlice';
import { gameSlice } from './GameSlice';
import { userSlice } from './NewUserSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    game: gameSlice.reducer,
  },
});

setupListeners(store.dispatch)
