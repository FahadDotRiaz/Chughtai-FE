import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";

const IrrApi = rtkQApi.injectEndpoints({
  tagTypes: ["IRR"],
  endpoints: (builder) => ({
    getIrrList: builder.query({
      query: ({ departmentId, tableOptions }) => {
        const params = {
          ...tableOptions.filters,
          page: tableOptions.pagination.pageIndex + 1,
          limit: tableOptions.pagination.pageSize,
        };
        return {
          url: `itemReturnRequest/myReqList/${departmentId}`,
          method: "GET",
          params: params,
        };
      },
      providesTags: (result) => providesList(result.list, "IrrList"),
    }),
    getIrrReviewList: builder.query({
      query: ({ departmentId, tableOptions }) => {
        const params = {
          ...tableOptions.filters,
          page: tableOptions.pagination.pageIndex + 1,
          limit: tableOptions.pagination.pageSize,
        };
        return {
          url: `itemReturnRequest/reviewReqList/${departmentId}`,
          method: "GET",
          params: params,
        };
      },
      providesTags: (result) => providesList(result.list, "IrrReviewList"),
    }),
    getIrrHodReviewList: builder.query({
      query: ({ departmentId, tableOptions }) => {
        const params = {
          ...tableOptions.filters,
          page: tableOptions.pagination.pageIndex + 1,
          limit: tableOptions.pagination.pageSize,
        };
        return {
          url: `itemReturnRequest/hodReviewList/${departmentId}`,
          method: "GET",
          params: params,
        };
      },
      providesTags: (result) => providesList(result.list, "IrrReviewList"),
    }),
    deleteIrr: builder.mutation({
      query: (id) => ({
        url: `itemReturnRequest/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["IrrList"],
    }),
    createIrr: builder.mutation({
      query: ({ finalData }) => ({
        url: `itemReturnRequest/create`,
        method: "POST",
        data: finalData,
      }),
      invalidatesTags: [{ type: "IrrList", id: "LIST" }],
    }),

    getIrrById: builder.query({
      query: ({ id }) => ({
        url: `itemReturnRequest/${id}`,
        method: "GET",
      }),
      // providesTags: ["ITEMS"],
    }),

    updateIrr: builder.mutation({
      query: ({ id, finalData }) => ({
        url: `itemReturnRequest/${id}`,
        method: "PATCH",
        data: finalData,
      }),
      invalidatesTags: [
        { type: "IrrList", id: "LIST" },
        { type: "IrrApprovedList", id: "LIST" },
      ],
    }),
    updateIrrHodReview: builder.mutation({
      query: ({ id, finalData }) => ({
        url: `itemReturnRequest/hodReview/${id}`,
        method: "PATCH",
        data: finalData,
      }),
      invalidatesTags: [
        { type: "IrrList", id: "LIST" },
        { type: "IrrApprovedList", id: "LIST" },
      ],
    }),
    approveIrr: builder.mutation({
      query: (data) => ({
        url: `itemReturnRequest/accept`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [{ type: "IrrReviewList", id: "LIST" }],
    }),

    getApprovedIrrList: builder.query({
      query: (departmentId) => ({
        url: `itemReturnRequest/approvedReqList/${departmentId}`,
        method: "GET",
      }),
      providesTags: (result) => providesList(result.list, "IrrApprovedList"),
    }),
  }),
});

export const {
  useGetIrrListQuery,
  useLazyGetIrrListQuery,
  useDeleteIrrMutation,
  useCreateIrrMutation,
  useGetIrrReviewListQuery,
  useLazyGetIrrReviewListQuery,
  useLazyGetIrrHodReviewListQuery,
  useGetIrrByIdQuery,
  useLazyGetIrrByIdQuery,
  useUpdateIrrMutation,
  useUpdateIrrHodReviewMutation,
  useApproveIrrMutation,
  useGetApprovedIrrListQuery,
} = IrrApi;
