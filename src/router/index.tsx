import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../shared/layouts/MainLayout";
import Home from "../client/pages/Home/Home";
import ProtectedRoute from "../shared/components/Route/ProtectedRoute";
import AuthLayout from "../shared/layouts/AuthLayout";
import AdminLayout from "../shared/layouts/AdminLayout";
import EmployeeLayout from "../shared/layouts/EmployeeLayout";

const RouterConfig = () => (
  <Routes>
    <Route path="/" element={<AuthLayout />}>
      <Route index element={<Home />} />
    </Route>

    <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Route>

    {/* Admin Route */}
    <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<div>Admin Dashboard</div>} />
        <Route path="dashboard" element={<div>Admin Dashboard Page</div>} />
        <Route path="users" element={<div>Admin Users Page</div>} />
        <Route path="settings" element={<div>Admin Settings Page</div>} />
      </Route>
    </Route>

    {/* Employee Route */}
    <Route element={<ProtectedRoute allowedRoles={["EMPLOYEE"]} />}>
      <Route path="/employee" element={<EmployeeLayout />}>
        <Route index element={<div>Employee Dashboard</div>} />
        <Route path="dashboard" element={<div>Employee Dashboard Page</div>} />
        <Route path="profile" element={<div>Employee Profile Page</div>} />
      </Route>
    </Route>

    {/* Fallback route */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default RouterConfig;
