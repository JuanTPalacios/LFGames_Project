import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { getMyGames } from "../Services/FetchCalls.js/GameApi.js/GameFetch";
import { CLIENT_ID, API_TOKEN, LOCAL_URL } from "@env";

const URL = LOCAL_URL;
console.log('gameslice', URL)

export const addGame = createAsyncThunk(
  "game/addGame",
  async (payload, thunkApi) => {
    try {
      const response = await fetch(URL + "games", {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + payload.token,
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        return thunkApi.rejectWithValue(data);
      }
    } catch (err) {
      thunkApi.rejectWithValue(err.message);
    }
  }
);

export const getMyGameInfo = createAsyncThunk(
  "game/getMyGameInfo",
  async (payload, thunkApi) => {
    try {
      const response = await fetch(URL + "games", {
        method: "GET",
        credentials: "include",
        mode: "cors",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + payload,
          "content-type": "application/json",
        },
      });
      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        return thunkApi.rejectWithValue(data);
      }
    } catch (err) {
      console.log("Error", err.message);
      thunkApi.rejectWithValue(err.message);
    }
  }
);

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    isMessage: "",
    userGames: [],
  },
  reducers: {
    clearGameState: (state) => {
      (state.isFetching = false),
        (state.isSuccess = false),
        (state.errorMessage = ""),
        (userGames = []);
      isMessage = "";
      isError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addGame.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(addGame.fulfilled, (state, { payload }) => {
        state.isFetching = false;

        state.isSuccess = true;
        state.isMessage = "";
        state.errorMessage = true;
      })
      .addCase(addGame.rejected, (state, payload) => {
        state.isFetching = false;
        state.isMessage = payload.payload.message;
        state.isError = true;
      });
    builder
      .addCase(getMyGameInfo.pending, (state, payload) => {
        state.isFetching = false;
        state.isError = true;
      })
      .addCase(getMyGameInfo.fulfilled, (state, { payload }) => {
        if (payload.length < 1) {
        }
        state.isFetching = false;
        state.isError = false;
        state.isSuccess = true;
        state.userGames = payload;
      })
      .addCase(getMyGameInfo.rejected, (state, payload) => {
        state.isFetching = false;
        state.isError = true;
      });
  },
});

export const { clearGameState } = gameSlice.actions;

export const gameSelector = (state) => state.game;
