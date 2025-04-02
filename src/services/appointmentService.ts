import { api } from "../api";

interface Appointment {
  id: number;
  date: string;
  status: string;
  employee: { id: number; fullName: string };
  services: { id: number; name: string }[];
  client: { id: number; name: string; pgone: string };
}

export const appointmentService = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllAppointments: builder.query<Appointment[], void>({
      query: () => "appointment",
    }),

    getAppointmentById: builder.query<Appointment, number>({
      query: (id) => `appointment/${id}`,
    }),

    getAppointmentsByClientId: builder.query<Appointment[], number>({
      query: (clientId) => `appointment/client/${clientId}`,
    }),

    getImageByAppointmentId: builder.query<Blob, number>({
      query: (id) => ({
        url: `appointment/${id}/image`,
        responseHandler: (response: any) => response.blob(),
      }),
    }),

    createAppointment: builder.mutation<Appointment, FormData>({
      query: (formData) => ({
        url: "appointment",
        method: "POST",
        body: formData,
      }),
    }),

    updateAppointment: builder.mutation<
      Appointment,
      { id: number; formData: any }
    >({
      query: ({ id, formData }) => ({
        url: `appointment/${id}`,
        method: "PUT",
        body: formData,
      }),
    }),

    deleteAppointment: builder.mutation<Appointment, number>({
      query: (id) => ({
        url: `appointment/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllAppointmentsQuery,
  useGetAppointmentByIdQuery,
  useGetAppointmentsByClientIdQuery,
  useGetImageByAppointmentIdQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
} = appointmentService;
