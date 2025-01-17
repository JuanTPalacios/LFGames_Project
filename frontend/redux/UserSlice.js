import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const URL = "http://192.168.2.16:3000/";

export const fetchUserByToken = createAsyncThunk(
  "user/fetchUserByToken",
  async ({ token }, thunkAPI) => {
    try {
      const response = await fetch(URL + "user", {
        method: "GET",
        credentials: "include",
        mode: "cors",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userName: "",
    email: "",

    token: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserByToken.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchUserByToken.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.email = payload.user.email;
        state.userName = payload.user.userName;
        state.token = payload.token;
      })
      .addCase(fetchUserByToken.rejected, (state) => {
        state.isFetching = false;
        state.isError = true;
      });
  },
});

export const userSelector = (state) => state.user;
