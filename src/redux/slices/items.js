import { rtkQApi } from "../rtkQApi";

const itemsApi = rtkQApi.injectEndpoints({
  tagTypes: ["items"],
  endpoints: (builder) => ({
    getItems: builder.query({
      query: (value) => ({
        url: `item?name=${value ? value : ""}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetItemsQuery, useLazyGetItemsQuery } = itemsApi;
