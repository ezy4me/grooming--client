import { api } from "../api";

interface Client {
  id: number;
  name: string;
  phone: string;
  userId: number;
  email: string;
}

export const clientService = api.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query<Client[], void>({
      query: () => "client",
      transformResponse: (response: any[]) =>
        response.map((client) => ({
          ...client,
          email: client.user?.email || "",
        })),
    }),
    getClientById: builder.query<Client, number>({
      query: (id) => `client/${id}`,
      transformResponse: (client: any) => ({
        ...client,
        email: client.user?.email || "",
      }),
    }),
    getClientByUserId: builder.query<Client | null, number>({
      query: (id) => `client/user/${id}`,
      transformResponse: (client: any) => {
        if (!client) {
          return null;
        }
        return {
          ...client,
          email: client.user?.email || "",
        };
      },
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
    createClient: builder.mutation<any, any>({
      query: (data) => ({
        url: `client`,
        method: "POST",
        body: data,
      }),
    }),
    generateClientAppointmentReport: builder.mutation<void, number>({
      query: (clientId) => ({
        url: `client/${clientId}/appointment/report`,
        method: "GET",
        responseHandler: (response: any) => response.blob(),
      }),
    }),
  }),
});

export const {
  useGetClientsQuery,
  useGetClientByIdQuery,
  useGetClientByUserIdQuery,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useCreateClientMutation,
  useGenerateClientAppointmentReportMutation,
} = clientService;
