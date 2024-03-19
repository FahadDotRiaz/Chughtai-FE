import { rtkQApi } from "../rtkQApi";

const itemsApi = rtkQApi.injectEndpoints({
  tagTypes: ["tracker"],
  endpoints: (builder) => ({
    getTrackingListById: builder.query({
      query: (id) => ({
        url: `tracking/list/${id}`,
        method: "GET",
      }),
      invalidatesTags: [{ type: "Track", id: "LIST" }],
    }),
  }),
});

export const { useGetTrackingListByIdQuery, useLazyGetTrackingListByIdQuery } =
  itemsApi;
