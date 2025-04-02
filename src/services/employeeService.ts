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
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useGetEmployeeImageQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useCreateEmployeeMutation,
} = employeeService;
