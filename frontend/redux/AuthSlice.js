import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInOldUser, signUpUser } from "./FetchCalls.js/AuthFetch";
const URL = "http://192.168.2.16:3000/";

//Sign Up User
export const signUp = createAsyncThunk("auth/signUp", async (body) => {
  const result = await signUpUser("signup", body);
  AsyncStorage.setItem("token", result.token);
  return result;
});
//Sign In User
export const signInUser = createAsyncThunk("auth/signInUser", async (body) => {
  const result = await signInOldUser("signin", body);
  AsyncStorage.setItem("token", result.token);
  return result;
});

export const signOutUser = createAsyncThunk(
  "auth/signOutUser",
  async (payload, thunkAPI) => {
    try {
      const response = await fetch(URL + "signout", {
        method: "GET",
        credentials: "include",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${payload}`,
        },
      });
      let data = await response.json();
      if (response.status === 200) {
        await AsyncStorage.removeItem("token");
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    userName: "",
    password: "",
    isFetching: false,
    isSuccess: false,
    errorMessage: "",
    isAuthenticated: false,
    token: "",
  },

  reducers: {
    clearState: (state) => {
      (state.isFetching = false),
        (state.isSuccess = false),
        (state.errorMessage = ""),
        (state.token = "");
    },
    signOut: (state) => (state.isAuthenticated = false),
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(signUp.fulfilled, (state, payload) => {
        state.isFetching = false;
        state.email = payload.meta.arg.userEmail;
        state.userName = payload.meta.arg.userName;
        state.isAuthenticated = true;
        state.errorMessage = "";
        state.token = payload.payload.token;
        state.isSuccess = true;
      })
      .addCase(signUp.rejected, (state, payload) => {
        state.isFetching = false;

        state.errorMessage = payload.payload.error;
      });
    builder
      .addCase(signInUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(signInUser.fulfilled, (state, { payload }) => {
        if (payload.error) {
          state.isSuccess = false;
          state.errorMessage = payload.error;
          state.isFetching = false;
        } else {
          state.isSuccess = true;
          state.isFetching = false;
          state.email = payload.user.email;
          state.userName = payload.user.userName;
          state.isAuthenticated = true;
          state.token = payload.token;
          state.errorMessage = "";
        }
      })
      .addCase(signInUser.rejected, (state, payload) => {
        state.isFetching = false;
        state.errorMessage = payload.payload.error;
      });
    builder
      .addCase(signOutUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(signOutUser.fulfilled, (state, { payload }) => {
        state.isFetching = false;

        state.isSuccess = true;
        state.isAuthenticated = false;
      })
      .addCase(signOutUser.rejected, (state, payload) => {
        state.isFetching = false;
      });
  },
});

export const { clearState, signOut } = authSlice.actions;

export const authSelector = (state) => state.auth;
