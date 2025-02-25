import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../shared/components/Login/Login";
import AuthLayout from "../shared/layouts/AuthLayout";
import MainLayout from "../shared/layouts/MainLayout";
import Home from "../client/pages/Home/Home";
import ProtectedRoute from "../shared/components/ProtectedRoute";
// import About from "../client/pages/About/About";
// import Services from "../client/pages/Services/Services";
// import Contacts from "../client/pages/Contacts/Contacts";

const RouterConfig = () => (
  <Routes>
    <Route
      path="/login"
      element={
        <AuthLayout>
          <Login />
        </AuthLayout>
      }
    />

    {/* Защищенные маршруты */}
    <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        {/* <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="contacts" element={<Contacts />} /> */}
      </Route>
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default RouterConfig;
