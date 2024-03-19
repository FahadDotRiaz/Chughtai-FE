import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";
import { sirAPI } from "./sir";

const irf_Api = rtkQApi.injectEndpoints({
  tagTypes: ["irf"],
  endpoints: (builder) => ({
    getItemRequest: builder.query({
      query: ({ departmentId, tableOptions }) => {
        const params = {
          ...tableOptions.filters,
          page: tableOptions.pagination.pageIndex + 1,
          limit: tableOptions.pagination.pageSize,
        };
        return {
          url: `itemRequest/myReqList/${departmentId}`,
          method: "GET",
          params: params,
        };
      },
      providesTags: (result) => providesList(result?.list, "ITEMS"),
    }),
    createItemRequest: builder.mutation({
      query: ({ finalData }) => ({
        url: "itemRequest/create",
        method: "POST",
        data: finalData,
      }),
      invalidatesTags: [
        { type: "ITEMS", id: "LIST" },
        { type: "ITEMS_ByID", id: "LIST" },
      ],

      // async onQueryStarted(request, { dispatch, queryFulfilled }) {
      // 	try {
      // 		const { data: newUser } = await queryFulfilled;
      // 		console.log("abcd", newUser);

      // 		dispatch(
      // 			irf_Api.util.updateQueryData(
      // 				"getItemRequest",
      // 				undefined,
      // 				(draft) => {
      // 					// eslint-disable-next-line no-debugger
      // 					debugger;
      // 					console.log("draft", draft, draft?.list, newUser);
      // 					draft?.push(newUser);
      // 				}
      // 			)
      // 		);
      // 	} catch (error) {
      // 		console.log("errorrrrrrr", error);
      // 	}
      // },
    }),

    deleteItemRequest: builder.mutation({
      query: (id) => ({
        url: `itemRequest/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "ITEMS", id: "LIST" }],
    }),

    getItemRequestByID: builder.query({
      query: ({ id }) => ({
        url: `itemRequest/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "ITEMS_ByID", id }],
    }),

    getItemRequestReviewList: builder.query({
      query: ({ departmentId, tableOptions }) => {
        const params = {
          ...tableOptions.filters,
          page: tableOptions.pagination.pageIndex + 1,
          limit: tableOptions.pagination.pageSize,
        };
        return {
          url: `itemRequest/reviewReqList/${departmentId}`,
          method: "GET",
          params: params,
        };
      },
      providesTags: (result) => providesList(result?.list, "ISSUE_ITEMS"),
    }),
    getItemRequestHODReviewList: builder.query({
      query: ({ departmentId, tableOptions }) => {
        const params = {
          ...tableOptions.filters,
          page: tableOptions.pagination.pageIndex + 1,
          limit: tableOptions.pagination.pageSize,
        };
        return {
          url: `itemRequest/hodReviewReqList/${departmentId}`,
          method: "GET",
          params: params,
        };
      },
      providesTags: (result) => providesList(result?.list, "REVIEW_ITEMS"),
    }),

    issueItemRequest: builder.mutation({
      query: ({ finalData }) => ({
        url: "itemRequest/issued",
        method: "POST",
        data: finalData,
      }),
      invalidatesTags: [
        { type: "ISSUE_ITEMS", id: "LIST" },
        { type: "ITEMS_ByID", id: "LIST" },
      ],
      async onQueryStarted(request, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            sirAPI.util.invalidateTags([{ type: "SirToList", id: "LIST" }])
          );
          dispatch(
            irf_Api.util.invalidateTags([
              { type: "ITEMS_ByID", id: request?.id },
            ])
          );
        } catch (error) {
          console.log("errorrrrrrr", error);
        }
      },
    }),

    updateItemRequest: builder.mutation({
      query: ({ id, finalData }) => ({
        url: `itemRequest/${id}`,
        method: "PATCH",
        data: finalData,
      }),
      invalidatesTags: [
        { type: "ITEMS", id: "LIST" },
        // { type: "ITEMS_ByID", id: "LIST" },
      ],
      async onQueryStarted(request, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            irf_Api.util.invalidateTags([
              { type: "ITEMS_ByID", id: request?.id },
            ])
          );
        } catch (error) {
          console.log("errorrrrrrr", error);
        }
      },
    }),

    updateHodReviewRequest: builder.mutation({
      query: ({ id, finalData }) => ({
        url: `itemRequest/hodReview/${id}`,
        method: "PATCH",
        data: finalData,
      }),
      invalidatesTags: [
        { type: "ITEMS", id: "LIST" },
        // { type: "ITEMS_ByID", id: "LIST" },
      ],
      async onQueryStarted(request, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            irf_Api.util.invalidateTags([
              { type: "ITEMS_ByID", id: request?.id },
            ])
          );
        } catch (error) {
          console.log("errorrrrrrr", error);
        }
      },
    }),

    getPostedImageDescription: builder.mutation({
      query: ({ file }) => ({
        customBaseUrl: "https://chughtaiaidev.xeventechnologies.com/",
        customHeader: { "Content-Type": "multipart/form-data" },
        url: `inventory/relatedItemDescription`,
        method: "POST",
        data: file,
      }),
    }),

    getRelatedItems: builder.mutation({
      query: (data) => ({
        customBaseUrl: "https://chughtaiaidev.xeventechnologies.com/",
        url: `inventory/relatedItems`,
        method: "POST",
        data: data,
      }),
    }),

    getItemRequestVersionHistoryById: builder.query({
      query: ({ mirId, sinId }) => {
        const params = {
          sinId,
        };
        return {
          url: `itemRequest/versionHistory/${mirId}`,
          method: "GET",
          params: params,
        };
      },
      providesTags: (result) => providesList(result?.list, "REVIEW_ITEMS"),
    }),
  }),
});

export const {
  useCreateItemRequestMutation,
  useGetItemRequestQuery,
  useLazyGetItemRequestQuery,
  useDeleteItemRequestMutation,
  useGetItemRequestByIDQuery,
  useLazyGetItemRequestByIDQuery,
  useGetItemRequestReviewListQuery,
  useLazyGetItemRequestReviewListQuery,
  useLazyGetItemRequestHODReviewListQuery,
  useIssueItemRequestMutation,
  useUpdateItemRequestMutation,
  useUpdateHodReviewRequestMutation,
  useGetPostedImageDescriptionMutation,
  useGetRelatedItemsMutation,
  useGetItemRequestVersionHistoryByIdQuery,
  useLazyGetItemRequestVersionHistoryByIdQuery,
} = irf_Api;
