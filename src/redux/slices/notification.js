import { rtkQApi } from "../rtkQApi";

const itemsApi = rtkQApi.injectEndpoints({
  tagTypes: ["notification"],
  endpoints: (builder) => ({
    getNotificationListById: builder.query({
      query: ({ userId, tableOptions }) => {
        const params = {
          ...tableOptions?.filters,
          page: tableOptions.pagination.pageIndex + 1,
          limit: tableOptions.pagination.pageSize,
        };
        return {
          //
          url: `notification/${userId}`,
          method: "GET",
          params: params,
        };
      },

      invalidatesTags: [{ type: "Notification", id: "LIST" }],
    }),
  }),
});

export const {
  useGetNotificationListByIdQuery,
  useLazyGetNotificationListByIdQuery,
} = itemsApi;
