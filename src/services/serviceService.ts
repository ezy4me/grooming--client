import { api } from "../api";

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
}

export const serviceService = api.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query<Service[], void>({
      query: () => "service",
    }),
    getServicesByCategory: builder.query<Service[], number>({
      query: (categoryId) => `service/category/${categoryId}`,
    }),
    updateService: builder.mutation<Service, Partial<Service> & { id: number }>(
      {
        query: ({ id, ...data }) => ({
          url: `service/${id}`,
          method: "PUT",
          body: data,
        }),
      }
    ),
    deleteService: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `service/${id}`,
        method: "DELETE",
      }),
    }),
    createService: builder.mutation<Service, Omit<Service, "id">>({
      query: (data) => ({
        url: `service`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServicesByCategoryQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useCreateServiceMutation,
} = serviceService;
