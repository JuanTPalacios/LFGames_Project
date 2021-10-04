import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LOCAL_URL } from 'react-native-dotenv';

const URL = LOCAL_URL;
console.log('gameslice', URL);

export const addGame = createAsyncThunk(
  'game/addGame',
  async (payload, thunkApi) => {
    try {
      const response = await fetch(`${URL}games`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${payload.token}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.status === 200) {
        return data;
      }
      return thunkApi.rejectWithValue(data);
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  },
);

export const getMyGameInfo = createAsyncThunk(
  'game/getMyGameInfo',
  async (payload, thunkApi) => {
    try {
      const response = await fetch(`${URL}games`, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${payload}`,
          'content-type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        return data;
      }
      return thunkApi.rejectWithValue(data);
    } catch (err) {
      console.log('Error', err.message);
      return thunkApi.rejectWithValue(err.message);
    }
  },
);

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    isMessage: '',
    userGames: [],
  },
  reducers: {
    clearGameState: (state) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.errorMessage = '';
      state.userGames = [];
      state.isMessage = '';
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addGame.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(addGame.fulfilled, (state) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.isMessage = '';
        state.errorMessage = 'no error';
      })
      .addCase(addGame.rejected, (state, payload) => {
        state.isFetching = false;
        state.isMessage = payload.payload.message;
        state.isError = true;
      });
    builder
      .addCase(getMyGameInfo.pending, (state) => {
        state.isFetching = false;
        state.isError = true;
      })
      .addCase(getMyGameInfo.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isError = false;
        state.isSuccess = true;
        state.userGames = payload;
      })
      .addCase(getMyGameInfo.rejected, (state) => {
        state.isFetching = false;
        state.isError = true;
      });
  },
});

export const { clearGameState } = gameSlice.actions;

export const gameSelector = (state) => state.game;
