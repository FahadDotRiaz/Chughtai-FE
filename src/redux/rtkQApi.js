/* eslint-disable no-unused-vars */
import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { getUser } from "../utils/helper";

const axiosBaseQuery =
	(
		{ baseUrl, userHeader } = {
			baseUrl: "",
		}
	) =>
	async (
		{ url, method, data, params, body, apiHeader, customBaseUrl, customHeader },
		api
	) => {
		let headers = {
			"Content-type": "application/json; charset=UTF-8",
			...customHeader,
		};

		if (userHeader) {
			const authHeader = await userHeader;
			headers = { ...headers, ...authHeader };
		}
		try {
			const resp = await axios({
				url: customBaseUrl ? customBaseUrl + url : baseUrl + url,
				method,
				data,
				params,
				headers,
			});
			if (resp.data.success || resp.data.succeeded) {
				return { data: resp.data.data };
			}
			throw resp.data;
		} catch (error) {
			if (error.response?.status === 401) {
				// await signOut();
			}
			return {
				error,
			};
		}
	};

const getTokenHeader = async () => {
	const session = getUser()?.access_token || null;
	if (session) {
		return {
			Authorization: `Bearer ${session}`,
		};
	}
	return null;
};
// const getTokenHeader = async () => {
// 	const access_token = getUser()?.access_token;
// 	if (access_token) {
// 		return {
// 			Authorization: `Bearer ${access_token}`,
// 		};
// 	}
// 	return null;
// };

export const rtkQApi = createApi({
	reducerPath: "rtkQApi",
	baseQuery: axiosBaseQuery({
		// baseUrl: "https://chughtaibe.xeventechnologies.com/",
		baseUrl: import.meta.env.VITE_BASE_URL,
		// credentials: "same-origin",
		userHeader: getTokenHeader(),
	}),
	endpoints: () => ({}),
});
