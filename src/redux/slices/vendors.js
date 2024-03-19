/* eslint-disable no-debugger */
import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";

const vendorsApi = rtkQApi.injectEndpoints({
	tagTypes: ["vendors"],
	endpoints: (builder) => ({
		getVendorsList: builder.query({
			query: ({ tableOptions }) => {
				const params = {
					...tableOptions.filters,
					page: tableOptions.pagination.pageIndex + 1,
					limit: tableOptions.pagination.pageSize,
				};
				return {
					
					url: "vendors",
					method: "GET",
					params: params,
				};
			},
			providesTags: (result) => providesList(result?.list, "Vendors"),
		}),
		createVendors: builder.mutation({
			query: ({ finalData }) => ({
				
				url: "vendors",
				method: "POST",
				data: finalData,
			}),
			invalidatesTags: [{ type: "Vendors", id: "LIST" }],
		}),
		getVendorsByID: builder.query({
			query: ({ id }) => ({
				
				url: `vendors/${id}`,
				method: "GET",
			}),
			providesTags: (result, error, id) => [{ type: "Vendors", id }],
		}),
		deleteVendor: builder.mutation({
			query: (id) => ({
				
				url: `vendors/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [{ type: "Vendors", id: "LIST" }],
		}),
		updateVendors: builder.mutation({
			query: ({ id, finalData }) => ({
				
				url: `vendors/${id}`,
				method: "PATCH",
				data: finalData,
			}),
			invalidatesTags: [{ type: "Vendors", id: "LIST" }],
		}),
	}),
});

export const {
	useGetVendorsListQuery,
	useLazyGetVendorsListQuery,
	useLazyGetVendorsByIDQuery,
	useCreateVendorsMutation,
	useGetVendorsByIDQuery,
	useDeleteVendorMutation,
	useUpdateVendorsMutation,
} = vendorsApi;
