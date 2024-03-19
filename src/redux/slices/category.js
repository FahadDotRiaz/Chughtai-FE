/* eslint-disable no-debugger */
import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";

const categoryAPI = rtkQApi.injectEndpoints({
  tagTypes: ["category"],
  endpoints: (builder) => ({
    getCategoryItemList: builder.query({
      query: ({ tableOptions }) => {
        const params = {
          ...tableOptions.filters,
          page: tableOptions.pagination.pageIndex + 1,
          limit: tableOptions.pagination.pageSize,
        };
        return {
          url: `category`,
          method: "GET",
          params: params,
        };
      },

      providesTags: (result) => providesList(result?.list, "Category"),
    }),
    getCategoryById: builder.query({
      query: (id) => ({
        url: `category/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Category", id }],
    }),
    postCategoryItem: builder.mutation({
      query: (data) => ({
        url: `category`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
    updateCategoryItem: builder.mutation({
      query: ({ id, finalData }) => ({
        url: `category/${id}`,
        method: "PATCH",
        data: finalData,
      }),
      async onQueryStarted(request, { dispatch, queryFulfilled }) {
        debugger;
        try {
          await queryFulfilled;
          dispatch(
            categoryAPI.util.invalidateTags([
              { type: "Category", id: request?.id },
            ])
          );
        } catch (error) {
          console.log("errorrrrrrr", error);
        }
      },
    }),
    deleteCategoryItem: builder.mutation({
      query: (id) => ({
        url: `category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCategoryItemListQuery,
  useLazyGetCategoryItemListQuery,
  useLazyGetCategoryByIdQuery,
  usePostCategoryItemMutation,
  useUpdateCategoryItemMutation,
  useDeleteCategoryItemMutation,
} = categoryAPI;
