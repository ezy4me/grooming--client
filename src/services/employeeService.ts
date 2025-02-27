import { api } from "../api";

interface Employee {
  id: number;
  fullName: string;
  phone: string;
  imageId?: number | null;
  birthday: string;
  userId: number;
}

export const employeeService = api.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<Employee[], void>({
      query: () => "employee",
    }),
    getEmployeeById: builder.query<Employee, number>({
      query: (id) => `employee/${id}`,
    }),
    updateEmployee: builder.mutation<
      Employee,
      Partial<Employee> & { id: number }
    >({
      query: ({ id, ...data }) => ({
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
    createEmployee: builder.mutation<Employee, Omit<Employee, "id">>({
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
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useCreateEmployeeMutation,
} = employeeService;
