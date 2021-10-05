import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TokenExpiredError } from 'jsonwebtoken';
// import { Pokemon } from './types'
import { LOCAL_URL } from 'react-native-dotenv';

interface ISignInRes {
  user: {
    userName: string
    email: string
  } 
}

interface ICreateUser {
  userName: string,
  email: string,
  password: string,
}

export const signUpUserApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: LOCAL_URL}),
  endpoints: (builder) => ({
    signUpUser: builder.mutation<ISignInRes, ICreateUser>({
      query: (body) => ({
        url: 'user',
        method: 'POST',
        body
      }),
    }),
  }),
});

export const { useSignUpUserMutation } = signUpUserApi;
