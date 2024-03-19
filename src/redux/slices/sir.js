import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";

export const sirAPI = rtkQApi.injectEndpoints({
	tagTypes: ["sir"],
	endpoints: (builder) => ({
		getSirList: builder.query({
			query: ({ departmentId, tableOptions }) => {
				const params = {
					...tableOptions.filters,
					page: tableOptions.pagination.pageIndex + 1,
					limit: tableOptions.pagination.pageSize,
				};
				return {
					url: `store-issued-notes/fromDepartment/${departmentId}`,
					method: "GET",
					params: params,
				};
			},
			providesTags: ["sirList"],
		}),
		getSir: builder.query({
			query: (id) => ({
				url: `store-issued-notes/${id}`,
				method: "GET",
			}),
			providesTags: ["sir"],
		}),
		getSirToList: builder.query({
			query: ({ departmentId, tableOptions }) => {
				const params = {
					...tableOptions.filters,
					page: tableOptions.pagination.pageIndex + 1,
					limit: tableOptions.pagination.pageSize,
				};
				return {
					url: `store-issued-notes/toDepartment/${departmentId}`,
					method: "GET",
					params: params,
				};
			},

			providesTags: (result) => providesList(result.list, "SirToList"),
		}),
		getSirById: builder.query({
			query: (sirId) => ({
				url: `store-issued-notes/${sirId}`,
				method: "GET",
			}),
			// providesTags: (result) => providesList(result, "SirToList"),
		}),
	}),
});

export const {
	useGetSirListQuery,
	useLazyGetSirListQuery,
	useGetSirQuery,
	useLazyGetSirQuery,
	useGetSirToListQuery,
	useLazyGetSirToListQuery,
	useGetSirByIdQuery,
	useLazyGetSirByIdQuery,
} = sirAPI;
