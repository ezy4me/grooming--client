import { api } from "../api";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export const clientService = api.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query<Client[], void>({
      query: () => "client",
    }),
    updateClient: builder.mutation<Client, Partial<Client> & { id: number }>({
      query: ({ id, ...data }) => ({
        url: `client/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteClient: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `client/${id}`,
        method: "DELETE",
      }),
    }),
    createClient: builder.mutation<Client, Omit<Client, "id">>({
      query: (data) => ({
        url: `client`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetClientsQuery,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useCreateClientMutation,
} = clientService;
