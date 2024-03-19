import { rtkQApi } from "../rtkQApi";

const fileAPI = rtkQApi.injectEndpoints({
	tagTypes: ["Files"],
	endpoints: (builder) => ({
		postFile: builder.mutation({
			query: (data) => ({
				url: `file-upload/upload`,
				customHeader: { "Content-Type": "multipart/form-data" },
				method: "POST",
				data: data,
			}),
		}),
	}),
});

export const { usePostFileMutation } = fileAPI;
