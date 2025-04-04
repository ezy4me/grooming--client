import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../shared/layouts/MainLayout";
import Home from "../client/pages/Home/Home";
import ProtectedRoute from "../shared/components/Route/ProtectedRoute";
import AuthLayout from "../shared/layouts/AuthLayout";
import AdminLayout from "../shared/layouts/AdminLayout";
import EmployeeLayout from "../shared/layouts/EmployeeLayout";
import CategoriesDashboard from "../admin/pages/CategoriesDashboard";
import ServicesDashboard from "../admin/pages/ServiceDashboard";
import ClientsDashboard from "../admin/pages/ClientsDashboard";
import EmployeesDashboard from "../admin/pages/EmployeesDashboard";
import ProfilePage from "../client/pages/Profile/ProfilePage";
import UsersDashboard from "../admin/pages/UsersDashboard";
import AppointmentsDashboard from "../admin/pages/AppointmentsDashboard";
import EmployeeSchedule from "../admin/pages/EmployeeSchedule";

const RouterConfig = () => (
  <Routes>
    <Route path="/" element={<AuthLayout />}>
      <Route index element={<Home />} />
    </Route>

    <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
      <Route path="/profile" element={<MainLayout />}>
        <Route index element={<ProfilePage />} />
      </Route>
    </Route>

    <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index path="users" element={<UsersDashboard />} />
        <Route path="categories" element={<CategoriesDashboard />} />
        <Route path="services" element={<ServicesDashboard />} />
        <Route path="clients" element={<ClientsDashboard />} />
        <Route path="employees" element={<EmployeesDashboard />} />
        <Route path="appointments" element={<AppointmentsDashboard/>} />
      </Route>
    </Route>

    <Route element={<ProtectedRoute allowedRoles={["EMPLOYEE"]} />}>
      <Route path="/employee" element={<EmployeeLayout />}>
        <Route index path="appointment" element={<EmployeeSchedule/>} />
      </Route>
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default RouterConfig;
