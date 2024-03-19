import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";

const departmentAPI = rtkQApi.injectEndpoints({
	tagTypes: ["department"],
	endpoints: (builder) => ({
		getDepartmentList: builder.query({
			query: ({ tableOptions }) => {
				const params = {
					...tableOptions.filters,
					page: tableOptions.pagination.pageIndex + 1,
					limit: tableOptions.pagination.pageSize,
				};
				return {
					url: `departments`,
					method: "GET",
					params: params,
				};
			},
			providesTags: (result) => providesList(result?.list, "Department"),
		}),
		getDepartmentById: builder.query({
			query: (id) => ({
				url: `departments/${id}`,
				method: "GET",
			}),
			providesTags: (result, error, id) => [{ type: "Department", id }],
		}),
		postDepartment: builder.mutation({
			query: (data) => ({
				url: `departments`,
				method: "POST",
				data: data,
			}),
			invalidatesTags: [{ type: "Department", id: "LIST" }],
		}),
		updateDepartment: builder.mutation({
			query: ({ id, finalData }) => ({
				url: `departments/${id}`,
				method: "PUT",
				data: finalData,
			}),
			async onQueryStarted(request, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(
						departmentAPI.util.invalidateTags([
							{ type: "Department", id: request?.id },
						])
					);
				} catch (error) {
					console.log("errorrrrrrr", error);
				}
			},
		}),
		departmentApproval: builder.mutation({
			query: ({departmentId, finalData}) => ({
				url: `departments/approval/${departmentId}`,
				method: "PUT",
				data: finalData,
			}),
			invalidatesTags: [{ type: "Department", id: "LIST" }],
		}),

		deleteDepartment: builder.mutation({
			query: (id) => ({
				url: `departments/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [{ type: "Department", id: "LIST" }],
		}),

		getDepartments: builder.query({
			query: (id) => ({
				url: `departments/type/${id}`,
				method: "GET",
			}),
		}),
	}),
});

export const {
	useGetDepartmentListQuery,
	useLazyGetDepartmentListQuery,
	useGetDepartmentByIdQuery,
	useLazyGetDepartmentByIdQuery,
	usePostDepartmentMutation,
	useUpdateDepartmentMutation,
	useDeleteDepartmentMutation,
	useDepartmentApprovalMutation,
	useGetDepartmentsQuery,
} = departmentAPI;
