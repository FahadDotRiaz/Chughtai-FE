import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";

const inventoryAPI = rtkQApi.injectEndpoints({
  tagTypes: ["inventory"],
  endpoints: (builder) => ({
    getInventoryItemList: builder.query({
      query: ({ departmentId, tableOptions }) => {
        const params = {
          ...tableOptions.filters,
          page: tableOptions.pagination.pageIndex + 1,
          limit: tableOptions.pagination.pageSize,
        };
        return {
          url: `inventory/view/inventoryItems/${departmentId}`,
          method: "GET",
          params: params,
        };
      },

      providesTags: (result) => providesList(result?.list, "InventoryItems"),
    }),
    // getConsumption: builder.query({
    //   query: (id) => ({
    //     url: `consumption/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: (result, error, id) => [{ type: "Consumption", id }],
    // }),
    postInventoryItem: builder.mutation({
      query: (data) => ({
        url: `inventory/add-item`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [{ type: "InventoryItems", id: "LIST" }],
    }),
    updateInventoryItem: builder.mutation({
      query: ({ id, finalData }) => ({
        url: `inventory/${id}`,
        method: "PATCH",
        data: finalData,
      }),
      invalidatesTags: [{ type: "InventoryItems", id: "LIST" }],
      async onQueryStarted(request, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            inventoryAPI.util.invalidateTags([
              { type: "InventoryItems", id: request?.id },
            ])
          );
        } catch (error) {
          console.log("errorrrrrrr", error);
        }
      },
    }),

    deleteInventoryItem: builder.mutation({
      query: (id) => ({
        url: `inventory/delete/inventoryItem/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "InventoryItems", id: "LIST" }],
    }),
  }),
});

export const {
  useGetInventoryItemListQuery,
  useLazyGetInventoryItemListQuery,
  useDeleteInventoryItemMutation,
  usePostInventoryItemMutation,
  useUpdateInventoryItemMutation,
  // useGetConsumptionQuery,
  // usePostConsumptionMutation,
  // useUpdateConsumptionMutation,
  // useDeleteConsumptionMutation,
} = inventoryAPI;
