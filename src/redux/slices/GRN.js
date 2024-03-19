import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";

const grnAPI = rtkQApi.injectEndpoints({
	tagTypes: ["grn"],
	endpoints: (builder) => ({
		getGrnList: builder.query({
			query: ({ departmentId, tableOptions }) => {
				const params = {
					...tableOptions.filters,
					page: tableOptions.pagination.pageIndex + 1,
					limit: tableOptions.pagination.pageSize,
				};
				return {
					url: `grn/list/${departmentId}`,
					method: "GET",
					params: params,
				};
			},
			providesTags: (result) => providesList(result?.list, "grn"),
		}),
		getGrnById: builder.query({
			query: (id) => ({
				url: `grn/${id}`,
				method: "GET",
			}),
			providesTags: (result, error, id) => [{ type: "grn", id }],
		}),
		postGrn: builder.mutation({
			query: (data) => ({
				url: `grn/create`,
				method: "POST",
				data: data,
			}),
			invalidatesTags: [{ type: "grn", id: "LIST" }],
		}),
		updateGrn: builder.mutation({
			query: ({ id, finalData }) => ({
				url: `grn/${id}`,
				method: "PATCH",
				data: finalData,
			}),
			async onQueryStarted(request, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(
						grnAPI.util.invalidateTags([{ type: "grn", id: request?.id }])
					);
				} catch (error) {
					console.log("errorrrrrrr", error);
				}
			},
		}),
		deleteGrn: builder.mutation({
			query: (id) => ({
				url: `grn/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [{ type: "grn", id: "LIST" }],
		}),
	}),
});

export const {
	useGetGrnListQuery,
	useLazyGetGrnListQuery,
	useGetGrnByIdQuery,
	useLazyGetGrnByIdQuery,
	usePostGrnMutation,
	useUpdateGrnMutation,
	useDeleteGrnMutation,
} = grnAPI;
