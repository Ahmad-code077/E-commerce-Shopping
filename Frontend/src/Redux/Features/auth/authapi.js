import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseUrl';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/auth`,
    credentials: 'include',
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: '/register',
        method: 'POST',
        body: newUser,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'Post',
      }),
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/delete/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    getAllUser: builder.mutation({
      query: () => ({
        url: '/getusers',
        method: 'GET',
      }),
      refetchOnMount: true,
      invalidatesTags: ['User'],
    }),
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/update/${userId}`,
        method: 'PUT',
        body: { role },
      }),
    }),
    editProfile: builder.mutation({
      query: (profileData) => ({
        url: '/update-profile',
        method: 'PATCH',
        body: profileData,
      }),
    }),
    // getMyProfile: builder.query({
    //   query: () => ({
    //     url: '/me',
    //   }),
    // }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: '/update-password',
        method: 'PATCH',
        body: data,
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useDeleteUserMutation,
  useGetAllUserMutation,
  useUpdateUserRoleMutation,
  useEditProfileMutation,
  useGetMyProfileQuery,
  useUpdatePasswordMutation,
} = authApi;
export default authApi;
