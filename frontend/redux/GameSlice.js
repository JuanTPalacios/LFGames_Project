import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { getMyGames } from "./FetchCalls.js/GameApi.js/GameFetch";
import { CLIENT_ID, API_TOKEN } from "@env";

const URL = "http://192.168.2.16:3000/";

export const addGame = createAsyncThunk(
  "game/addGame",
  async (payload, thunkApi) => {
    try {
      const response = await fetch(URL + "addGame", {
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
      console.log("GAME DATA", data);
      if (response.status === 200) {
        return data;
      } else {
        console.log("heeeeelllo");
        return thunkApi.rejectWithValue(data);
      }
    } catch (err) {
      console.log("called");
      console.log("Error", err.message);
      thunkApi.rejectWithValue(err.message);
    }
  }
);
export const getGameInfo = createAsyncThunk(
  "game/getGameInfo",
  async (body) => {
    const result = await getMyGames("games", body, {
      method: "GET",
      headers: {
        "Client-ID": `${CLIENT_ID}`,
        Authorization: `Bearer ${API_TOKEN}`,
        "content-type": "text/plain",
      },
    });
    console.log(result);
    return result;
  }
);

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    games: [],
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addGame.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(addGame.fulfilled, (state, { payload }) => {
        if (payload.game.gameId) {
          state.isFetching = false;
          state.isSuccess = true;
          state.games.push(payload.game);
        } else {
          console.log(state);
          state.errorMessage = true;
        }
      })
      .addCase(addGame.rejected, (state, payload) => {
        state.isFetching = false;
        state.isError = true;
        console.log("reje");
      })
      .addCase(getGameInfo.pending, (state, payload) => {
        state.isFetching = false;
        state.isError = true;
        console.log(payload);
      })
      .addCase(getGameInfo.fulfilled, (state, payload) => {
        state.isFetching = false;
        state.isError = true;
        console.log(payload);
      })
      .addCase(getGameInfo.rejected, (state, payload) => {
        state.isFetching = false;
        state.isError = true;
        console.log("reje");
      });
  },
});

// export const { clearState } = authSlice.actions;

export const gameSelector = (state) => state.game;
