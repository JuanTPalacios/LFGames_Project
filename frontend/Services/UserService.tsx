import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { Pokemon } from './types'
import { LOCAL_URL } from 'react-native-dotenv';


interface IUserRes {
  user: IUser,
  token: string
}

interface IUser {
  userName: string,
  email: string,
  password?: string,
}

interface ICreate {
  userName: string,
  userEmail: string,
  userPassword: string,
}

// { user: all user info, token: string }

export const signUpUserApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: LOCAL_URL}),
  endpoints: (builder) => ({
    signUpUser: builder.mutation<IUserRes, ICreate>({
      query: (body) => ({
        url: `user`,
        method: 'POST',
        body
        }),
    }),
  }),
});

export const { useSignUpUserMutation } = signUpUserApi;
