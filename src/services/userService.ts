import { api } from "../api";

interface User {
  id: number;
  email: string;
  role: string;
}

export const userService = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "user",
    }),
    getUserById: builder.query<User, number>({
      query: (id) => `user/${id}`,
    }),
    updateUser: builder.mutation<User, Partial<User> & { id: number }>({
      query: ({ id, ...data }) => ({
        url: `user/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteUser: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `user/${id}`,
        method: "DELETE",
      }),
    }),
    createUser: builder.mutation<User, Omit<User, "id">>({
      query: (data) => ({
        url: `user`,
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
