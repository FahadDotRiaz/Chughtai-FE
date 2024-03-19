import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";

const roleAPI = rtkQApi.injectEndpoints({
  tagTypes: ["role"],
  endpoints: (builder) => ({
    getADMIN_ROLE_LIST: builder.query({
      query: ({ tableOptions }) => {
        const params = {
          ...tableOptions.filters,
          page: tableOptions.pagination.pageIndex + 1,
          limit: tableOptions.pagination.pageSize,
        };
        return {
          //
          url: `role`,
          method: "GET",
          params: params,
        };
      },
      providesTags: (result) => providesList(result?.list, "Role"),
    }),
    getRoleById: builder.query({
      query: (id) => ({
        //
        url: `role/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Role", id }],
    }),
    postRole: builder.mutation({
      query: (data) => ({
        //
        url: `role/create`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [{ type: "Role", id: "LIST" }],
    }),
    updateRole: builder.mutation({
      query: ({ id, finalData }) => ({
        //
        url: `role/${id}`,
        method: "PUT",
        data: finalData,
      }),
      invalidatesTags: [{ type: "Role", id: "LIST" }],
      // async onQueryStarted(request, { dispatch, queryFulfilled }) {
      // 	try {
      // 		await queryFulfilled;
      // 		dispatch(
      // 			roleAPI.util.invalidateTags([{ type: "Role", id: request?.id }])
      // 		);
      // 	} catch (error) {
      // 		console.log("errorrrrrrr", error);
      // 	}
      // },
    }),

    deleteRole: builder.mutation({
      query: (id) => ({
        //
        url: `role/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Role", id: "LIST" }],
    }),

    getRolesByDepartment: builder.query({
      query: ({ tableOptions, departmentId }) => {
        const params = {
          ...tableOptions.filters,
          page: tableOptions.pagination.pageIndex + 1,
          limit: tableOptions.pagination.pageSize,
        };
        return {
          //
          url: `role?department=${departmentId}`,
          method: "GET",
          params: params,
        };
      },
      providesTags: (result) => providesList(result?.list, "Role"),
    }),

    getRoleLevels: builder.query({
      query: (type) => ({
        //
        url: `role/levels`,
        method: "GET",
        params: type,
      }),
      providesTags: (result) => providesList(result?.list, "Role"),
    }),
  }),
});

export const {
  useGetADMIN_ROLE_LISTQuery,
  useLazyGetADMIN_ROLE_LISTQuery,
  useGetRoleByIdQuery,
  useLazyGetRoleByIdQuery,
  usePostRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useGetRolesByDepartmentQuery,
  useLazyGetRolesByDepartmentQuery,
  useGetRoleLevelsQuery,
  useLazyGetRoleLevelsQuery,
} = roleAPI;
