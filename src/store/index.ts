import { serviceService } from "./../services/serviceService";
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api";
import { categoryService } from "../services/categoryService";
import authReducer from "./authSlice";
import { clientService } from "../services/clientService";
import { employeeService } from "../services/employeeService";
import { userService } from "../services/userService";
import { appointmentService } from "../services/appointmentService";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    category: categoryService.reducer,
    client: clientService.reducer,
    employee: employeeService.reducer,
    user: userService.reducer,
    service: serviceService.reducer,
    appointment: appointmentService.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
