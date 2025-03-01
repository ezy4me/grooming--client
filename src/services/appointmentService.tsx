import { api } from "../api";

interface Appointment {
  id: number;
  date: string;
  status: string;
  employee: { id: number; name: string };
  services: { id: number; name: string }[];
}

export const appointmentService = api.injectEndpoints({
  endpoints: (builder) => ({
    getAppointmentsByClientId: builder.query<Appointment[], number>({
      query: (clientId) => `appointment/client/${clientId}`,
    }),
  }),
});

export const { useGetAppointmentsByClientIdQuery } = appointmentService;
