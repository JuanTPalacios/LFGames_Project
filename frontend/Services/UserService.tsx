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

// { user: all user info, token: string }

export const signUpUserApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: LOCAL_URL}),
  endpoints: (builder) => ({
    signUpUser: builder.query<IUserRes, string>({
      query: (body) => ({
        url: `user`,
        method: 'POST',
        body
        }),
    }),
  }),
});

export const { useSignUpUser } = signUpUserApi;


//addPost: build.mutation<Post, Partial<Post>>({
      //query: (body) => ({
        //url: `posts`,
        //method: 'POST',
        //body,
      //}),
      //invalidatesTags: [{ type: 'Post', id: 'LIST' }],