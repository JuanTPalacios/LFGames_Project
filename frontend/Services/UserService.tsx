import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TokenExpiredError } from 'jsonwebtoken';
// import { Pokemon } from './types'
import { LOCAL_URL } from 'react-native-dotenv';

interface IData {
  token?: string
  user?: IUser
  error?: { data: { error: string }} 
} 

interface IRes {
  data: IData
}

interface IUser {
  userName: string,
  email: string,
}

interface ICreate {
  userName: string,
  userEmail: string,
  userPassword: string,
}

export const signUpUserApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: LOCAL_URL}),
  endpoints: (builder) => ({
    signUpUser: builder.mutation<IRes, ICreate>({
      query: (body) => ({
        url: `user`,
        method: 'POST',
        body
      }),
    }),
  }),
});

export const { useSignUpUserMutation } = signUpUserApi;
