import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";

const locationAPI = rtkQApi.injectEndpoints({
  tagTypes: ["location"],
  endpoints: (builder) => ({
    getLocationList: builder.query({
      query: ({ tableOptions }) => {
        const params = {
          ...tableOptions.filters,
          page: tableOptions.pagination.pageIndex + 1,
          limit: tableOptions.pagination.pageSize,
        };
        return {
          
          url: `locations`,
          method: "GET",
          params: params,
        };
      },
      providesTags: (result) => providesList(result?.list, "Location"),
    }),
    getLocationById: builder.query({
      query: (id) => ({
        
        url: `locations/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Location", id }],
    }),
    postLocation: builder.mutation({
      query: (data) => ({
        
        url: `locations`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [{ type: "Location", id: "LIST" }],
    }),
    updateLocation: builder.mutation({
      query: ({ id, finalData }) => ({
        
        url: `locations/${id}`,
        method: "PUT",
        data: finalData,
      }),
      async onQueryStarted(request, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            locationAPI.util.invalidateTags([
              { type: "Location", id: request?.id },
            ])
          );
        } catch (error) {
          console.log("errorrrrrrr", error);
        }
      },
    }),

    deleteLocation: builder.mutation({
      query: (id) => ({
        
        url: `locations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Location", id: "LIST" }],
    }),

    //COUNTRY
    getCountries: builder.query({
      query: () => ({
        
        url: `country`,
        method: "GET",
      }),
    }),

    //PROVINCE
    getProvinces: builder.query({
      query: ({ id = null }) => ({
        
        url: `province`,
        method: "GET",
        params: {
          country: id,
        },
      }),
      // providesTags: (result) => providesList(result, "Province"),
    }),

    // CITY
    getCitiesByProvince: builder.query({
      query: ({ id }) => ({
        
        url: `city/${id}`,
        method: "GET",
      }),
      // providesTags: (result) => providesList(result, "Province"),
    }),

    //AREA
    getAreasByCity: builder.query({
      query: ({ id }) => ({
        
        url: `area/${id}`,
        method: "GET",
      }),
      // providesTags: (result) => providesList(result, "Province"),
    }),
  }),
});

export const {
  useGetLocationListQuery,
  useLazyGetLocationListQuery,
  useGetLocationByIdQuery,
  useLazyGetLocationByIdQuery,
  usePostLocationMutation,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
  useGetProvincesQuery,
  useLazyGetProvincesQuery,
  useLazyGetCitiesByProvinceQuery,
  useLazyGetAreasByCityQuery,
  useGetCountriesQuery,
} = locationAPI;
