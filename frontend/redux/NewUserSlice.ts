import { createSlice, createSelector } from '@reduxjs/toolkit';

interface IState {
  user: {
    userName: string,
    email: string,
    games: any[]
  },
  isAuthenticated: boolean
}

const initialState: IState = {
  user: {
    userName: '',
    email: '',
    games: []
  },
  isAuthenticated: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
    userName: '',
    email: '',
    games: []
  },
  isAuthenticated: false
  },
  reducers: {
    clearState: (state) => {
      state.user = initialState.user;
      state.isAuthenticated = false;
    },
    signOut: (state) => { 
      state.user = initialState.user;
      state.isAuthenticated = false;
    },
    signIn: (state, body) => {
      const { payload } = body;
      state.user = {
        ...payload
      };
      state.isAuthenticated = true;
    }
  }
});

export const { signIn, signOut, clearState } = userSlice.actions;
export const authSelector = (state) => state.user;
export default userSlice.reducer;
