import { rtkQApi } from "../rtkQApi";

const chatBotApi = rtkQApi.injectEndpoints({
	tagTypes: ["chatbot"],
	endpoints: (builder) => ({
		postQuery: builder.mutation({
			query: ({ query, file }) => ({
				customBaseUrl: "https://chughtaiaidev.xeventechnologies.com/",
				customHeader: { "Content-Type": "multipart/form-data" },
				url: `User/inventoryBot?query=${query}`,
				method: "POST",
				data: file,
			}),
		}),
	}),
});

export const { usePostQueryMutation } = chatBotApi;
