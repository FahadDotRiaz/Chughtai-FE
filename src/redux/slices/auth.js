/* eslint-disable no-debugger */
import { rtkQApi } from "../rtkQApi";

const authApi = rtkQApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => {
       
        return {
          url: "auth/login",
          method: "POST",
          data: credentials,
        };
      },
    }),
    permissions: builder.query({
      query: (id) => ({
        url: `auth/role/permissions/${id}`,
        method: "GET",
      }),
    }),
    logout: builder.mutation({
      query: (id) => {
      
        return {
          url: `auth/logout/${id}`,

          method: "POST",
        };
      },
    }),
    // register: builder.mutation({
    // 	query: (request) => ({
    // 		url: "auth/register",
    // 		method: "POST",
    // 		data: request,
    // 	}),
    // }),
    // forgot: builder.mutation({
    // 	query: (request) => ({
    // 		url: `auth/forgot-password/${request}`,
    // 		method: "POST",
    // 		// data: request,
    // 	}),
    // }),
    // update: builder.mutation({
    // 	query: (request) => ({
    // 		url: `auth/update-password`,
    // 		method: "PUT",
    // 		data: request,
    // 	}),
    // }),
  }),

  //   overrideExisting: false,
});

export const {
  //   useRegisterMutation,
  //   useForgotMutation,
  //   useUpdateMutation,
  useLoginMutation,
  usePermissionsQuery,
  useLazyPermissionsQuery,
  useLogoutMutation,
} = authApi;
