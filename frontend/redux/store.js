import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./AuthSlice";
import { gameSlice } from "./GameSlice";
import { userSlice } from "./UserSlice";

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    game: gameSlice.reducer,
  },
});
