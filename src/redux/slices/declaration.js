/* eslint-disable no-debugger */
import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";

const declarationAPI = rtkQApi.injectEndpoints({
  tagTypes: ["declaration"],
  endpoints: (builder) => ({
    getDeclarationItemList: builder.query({
      query: ({ tableOptions }) => {
        const params = {
          ...tableOptions.filters,
          page: tableOptions.pagination.pageIndex + 1,
          limit: tableOptions.pagination.pageSize,
        };
        return {
          url: `item`,
          method: "GET",
          params: params,
        };
      },

      providesTags: (result) => providesList(result?.list, "Declaration"),
    }),
    getDeclarationById: builder.query({
      query: (id) => ({
        url: `item/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Declaration", id }],
    }),
    postDeclarationItem: builder.mutation({
      query: (data) => ({
        url: `item`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [{ type: "Declaration", id: "LIST" }],
    }),
    updateDeclarationItem: builder.mutation({
      query: ({ id, finalData }) => ({
        url: `item/${id}`,
        method: "PATCH",
        data: finalData,
      }),
      async onQueryStarted(request, { dispatch, queryFulfilled }) {
        debugger;
        try {
          await queryFulfilled;
          dispatch(
            declarationAPI.util.invalidateTags([
              { type: "Declaration", id: request?.id },
            ])
          );
        } catch (error) {
          console.log("errorrrrrrr", error);
        }
      },
    }),
    deleteDeclarationItem: builder.mutation({
      query: (id) => ({
        url: `item/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Declaration", id: "LIST" }],
    }),
    getDeclarationChildItem: builder.query({
      query: ({ name }) => ({
        url: `item/child?name=${name}`,
        method: "GET",
      }),
      invalidatesTags: [{ type: "Declaration", id: "LIST" }],
    }),
  }),
});

export const {
  useGetDeclarationItemListQuery,
  useLazyGetDeclarationItemListQuery,
  useLazyGetDeclarationByIdQuery,
  usePostDeclarationItemMutation,
  useUpdateDeclarationItemMutation,
  useDeleteDeclarationItemMutation,
  useGetDeclarationChildItemQuery,
  useLazyGetDeclarationChildItemQuery,
} = declarationAPI;
