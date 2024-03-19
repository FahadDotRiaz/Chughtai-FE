import { rtkQApi } from "../rtkQApi";

const doctorApi = rtkQApi.injectEndpoints({
	tagTypes: ["Doctors"],
	endpoints: (builder) => ({
		getDoctor: builder.query({
			query: ({ name, role, limit, page }) => ({
				url: `users?name=${name}&role=${role}&limit=${limit}&page=${page}`,
				method: "GET",
				// data: request,
				// providesTags: ["Doctors"],
			}),
		}),
		addDoctor: builder.mutation({
			query: (request) => ({
				url: "auth/register",
				method: "POST",
				data: request,
			}),
			async onQueryStarted(request, { dispatch, queryFulfilled }) {
				try {
					const { data: newUser } = await queryFulfilled;
					// console.log("abcd", newUser);
					// console.log("dispatch", dispatch, doctorApi);
					dispatch(
						doctorApi.util.updateQueryData(
							"getDoctor",
							{
								name: "",
								role: "Doctor",
								limit: 20,
								page: 1,
							},
							(draft) => {
								console.log("draft", draft);
								draft?.list?.push(newUser);
							}
						)
					);
				} catch (error) {
					console.log("errorrrrrrr", error);
				}
			},
		}),
		updateDoctor: builder.mutation({
			query: ({ id, ...request }) => ({
				url: `users/${id}`,
				method: "PATCH",
				data: request,
			}),
			invalidatesTags: ["Doctors"],
		}),
	}),
});

export const {
	useGetDoctorQuery,
	useAddDoctorMutation,
	useUpdateDoctorMutation,
} = doctorApi;
