import { rtkQApi } from "../rtkQApi";

const gatePassAPI = rtkQApi.injectEndpoints({
  tagTypes: ["gatepass"],
  endpoints: (builder) => ({
    getGatePassList: builder.query({
      query: ({ type, tableOptions }) => {
        const params = {
          ...tableOptions.filters,
          page: tableOptions.pagination.pageIndex + 1,
          limit: tableOptions.pagination.pageSize,
        };
        return {
          url: `gate-passes/list/${type}`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["GP"],
    }),
    createGatePass: builder.mutation({
      query: ({ finalData }) => ({
        url: "gate-passes",
        method: "POST",
        data: finalData,
      }),
      invalidatesTags: ["GP"],
    }),

    deleteGatePass: builder.mutation({
      query: (id) => ({
        url: `gate-passes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GP"],
    }),

    getGatePassByID: builder.query({
      query: ({ id }) => ({
        url: `gate-passes/${id}`,
        method: "GET",
      }),
      providesTags: ["GP_ID"],
    }),

    updateGatePass: builder.mutation({
      query: ({ id, finalData }) => ({
        url: `gate-passes/${id}`,
        method: "PATCH",
        data: finalData,
      }),
      invalidatesTags: ["GP", "GP_ID"],
    }),
  }),
});

export const {
  useGetGatePassListQuery,
  useLazyGetGatePassListQuery,
  useCreateGatePassMutation,
  useDeleteGatePassMutation,
  useGetGatePassByIDQuery,
  useLazyGetGatePassByIDQuery,
  useUpdateGatePassMutation,
} = gatePassAPI;
