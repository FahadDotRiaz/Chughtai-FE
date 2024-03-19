import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";

const usersAPI = rtkQApi.injectEndpoints({
  tagTypes: ["user"],
  endpoints: (builder) => ({
    getUsersList: builder.query({
      query: ({ tableOptions }) => {
        const params = {
          ...tableOptions.filters,
          page: tableOptions.pagination.pageIndex + 1,
          limit: tableOptions.pagination.pageSize,
        };
        return {
          url: `users`,
          method: "GET",
          params: params,
        };
      },
      providesTags: (result) => providesList(result?.list, "User"),
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `users/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    postUser: builder.mutation({
      query: (data) => ({
        url: `users/create`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: ({ id, finalData }) => ({
        url: `users/${id}`,
        method: "PUT",
        data: finalData,
      }),
      async onQueryStarted(request, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            usersAPI.util.invalidateTags([{ type: "User", id: request?.id }])
          );
        } catch (error) {
          console.log("errorrrrrrr", error);
        }
      },
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    getUserByEmail: builder.query({
      query: (email) => ({
        url: `users?email=${email}`,
        method: "GET",
      }),
      // providesTags: (result, error, id) => [{ type: "User", id }],
    }),
  }),
});

export const {
  useGetUsersListQuery,
  useLazyGetUsersListQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  usePostUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useLazyGetUserByEmailQuery,
} = usersAPI;
