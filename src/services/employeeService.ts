import { api } from "../api";

interface Employee {
  id: number;
  fullName: string;
  phone: string;
  imageId?: number | null;
  birthday: string;
  userId: string;
}

export const employeeService = api.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<Employee[], void>({
      query: () => "employee",
    }),
    getEmployeeById: builder.query<Employee, number>({
      query: (id) => `employee/${id}`,
    }),
    getEmployeeByUserId: builder.query<Employee, number>({
      query: (id) => `employee/user/${id}`,
    }),
    getEmployeeImage: builder.query<string, number>({
      query: (id) => `employee/${id}/image`,
    }),
    updateEmployee: builder.mutation<Employee, { id: number; data: FormData }>({
      query: ({ id, data }) => ({
        url: `employee/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteEmployee: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `employee/${id}`,
        method: "DELETE",
      }),
    }),
    createEmployee: builder.mutation<Employee, FormData>({
      query: (data) => ({
        url: `employee`,
        method: "POST",
        body: data,
      }),
    }),

    getEmployeeSchedule: builder.query<
      any[],
      { employeeId: number; start: string; end: string }
    >({
      query: ({ employeeId, start, end }) => ({
        url: `employee/${employeeId}/calendar`,
        method: "POST",
        body: { start, end },
      }),
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useGetEmployeeByUserIdQuery,
  useGetEmployeeImageQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useCreateEmployeeMutation,
  useGetEmployeeScheduleQuery,
} = employeeService;
