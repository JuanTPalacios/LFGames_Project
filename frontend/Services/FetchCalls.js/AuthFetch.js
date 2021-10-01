//import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LOCAL_URL } from "@env";
const URL = "http://192.168.1.100:3000/";

export const signUpUser = async (api, body) => {
  const response = await fetch(URL + 'user', {
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
  const response = await fetch(URL + 'signin', {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};
