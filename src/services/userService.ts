import { api } from "../api";

interface User {
  id: number;
  email: string;
  role: string;
}

export const userService = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "users",
    }),
    getUserById: builder.query<User, number>({
      query: (id) => `users/${id}`,
    }),
    updateUser: builder.mutation<User, Partial<User> & { id: number }>({
      query: ({ id, ...data }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteUser: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
    }),
    createUser: builder.mutation<User, Omit<User, "id">>({
      query: (data) => ({
        url: `users`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCreateUserMutation,
} = userService;
