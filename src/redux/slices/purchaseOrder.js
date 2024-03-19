import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";

const purchaseOrderAPI = rtkQApi.injectEndpoints({
	tagTypes: ["purchaseOrder"],
	endpoints: (builder) => ({
		getPOList: builder.query({
			query: ({ departmentId, tableOptions }) => {
				const params = {
					...tableOptions?.filters,
					page: tableOptions.pagination.pageIndex + 1,
					limit: tableOptions.pagination.pageSize,
				};
				return {
					// 
					url: `purchase-order/${departmentId}`,
					method: "GET",
					params: params,
				};
			},

			providesTags: (result) => providesList(result?.list, "purchaseOrder"),
		}),
		getPOItemsById: builder.query({
			query: ({ id }) => ({
				// 
				url: `purchase-order/purchaseOrderItems/${id}`,
				method: "GET",
			}),
			providesTags: (result, error, id) => [{ type: "purchaseOrder", id }],
		}),
		createPO: builder.mutation({
			query: ({ finalData }) => ({
				// 
				url: "purchase-order/create",
				method: "POST",
				data: finalData,
			}),
			invalidatesTags: [{ type: "purchaseOrder", id: "LIST" }],
		}),
		updatePO: builder.mutation({
			query: ({ id, finalData }) => ({
				// 
				url: `purchase-order/update/${id}`,
				method: "PATCH",
				data: finalData,
			}),
			invalidatesTags: [{ type: "purchaseOrder", id: "LIST" }],
		}),
	}),
});

export const {
	useGetPOListQuery,
	useLazyGetPOListQuery,
	useGetPOItemsByIdQuery,
	useLazyGetPOItemsByIdQuery,
	useCreatePOMutation,
	useUpdatePOMutation,
} = purchaseOrderAPI;
