import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";

const consumptionAPI = rtkQApi.injectEndpoints({
  tagTypes: ["consumption"],
  endpoints: (builder) => ({
    getConsumptionList: builder.query({
      query: ({ departmentId, tableOptions }) => {
        const params = {
          ...tableOptions.filters,
          page: tableOptions.pagination.pageIndex + 1,
          limit: tableOptions.pagination.pageSize,
        };
        return {
          url: `consumption/list/${departmentId}`,
          method: "GET",
          params: params,
        };
      },
      providesTags: (result) => providesList(result?.list, "Consumption"),
    }),
    getConsumptionDeptList: builder.query({
      query: ({ departmentId, tableOptions }) => {
        const params = {
          ...tableOptions.filters,
          page: tableOptions.pagination.pageIndex + 1,
          limit: tableOptions.pagination.pageSize,
        };
        return {
          url: `consumption/department/${departmentId}`,
          method: "GET",
          params: params,
        };
      },
      providesTags: (result) => providesList(result?.list, "Consumption"),
    }),
    getConsumptionById: builder.query({
      query: ({ id }) => ({
        url: `consumption/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Consumption", id }],
    }),
    postConsumption: builder.mutation({
      query: (data) => ({
        url: `consumption/create`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [{ type: "Consumption", id: "LIST" }],
    }),
    updateConsumption: builder.mutation({
      query: ({ id, finalData }) => ({
        url: `consumption/${id}`,
        method: "PATCH",
        data: finalData,
      }),
      async onQueryStarted(request, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            consumptionAPI.util.invalidateTags([
              { type: "Consumption", id: request?.id },
            ])
          );
        } catch (error) {
          console.log("errorrrrrrr", error);
        }
      },
    }),

    deleteConsumption: builder.mutation({
      query: (id) => ({
        url: `consumption/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Consumption", id: "LIST" }],
    }),
  }),
});

export const {
  useGetConsumptionListQuery,
  useGetConsumptionDeptListQuery,
  useLazyGetConsumptionListQuery,
  useLazyGetConsumptionDeptListQuery,
  useGetConsumptionByIdQuery,
  usePostConsumptionMutation,
  useUpdateConsumptionMutation,
  useDeleteConsumptionMutation,
} = consumptionAPI;
