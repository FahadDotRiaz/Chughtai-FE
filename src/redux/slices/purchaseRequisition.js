// import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";

const purchaseRequisitionApi = rtkQApi.injectEndpoints({
  tagTypes: ["purchaseRequisition"],
  endpoints: (builder) => ({
    createPurchaseRequisition: builder.mutation({
      query: ({ finalData }) => ({
        url: "purchase-requests",
        method: "POST",
        data: finalData,
      }),
      invalidatesTags: [{ type: "PurchaseRequisition", id: "LIST" }],
    }),
  }),
});

export const {
  useCreatePurchaseRequisitionMutation,
} = purchaseRequisitionApi;
