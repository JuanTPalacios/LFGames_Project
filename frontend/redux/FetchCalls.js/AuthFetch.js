import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const URL = "http://192.168.2.16:3000/";

export const signUpUser = async (api, body) => {
  const response = await fetch(URL + api, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};

// Sign In

export const signInOldUser = async (api, body) => {
  const response = await fetch(URL + api, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};



