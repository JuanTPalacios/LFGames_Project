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

export const signInUser = async (api, body) => {
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

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTUxMDk5MThiNjU1MzIwNWIyNjY5MzQiLCJpYXQiOjE2MzI3MDA4MTd9.TokTaVd7UkZZaZ8I8QU251pPp5a0r33EEa4-E3hYGY8

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTUxMDljMDhiNjU1MzIwNWIyNjY5MzkiLCJpYXQiOjE2MzI3MDA4NjR9.IxZiPJs6FAgZmervXW2cqHATQZObwEWaG6xL8WWIWos

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTUxMDlmOThiNjU1MzIwNWIyNjY5M2UiLCJpYXQiOjE2MzI3MDA5MjF9.-qGDfeQ1fmh2dr1E4q35zaDiviKklSZzapmVpS6niZs
