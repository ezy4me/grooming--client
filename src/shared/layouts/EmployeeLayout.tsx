import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { Box } from "@mui/material";
import { FaUserCircle, FaHome } from "react-icons/fa";

const AdminLayout: React.FC = () => {
  const location = useLocation();

  const links = [
    { text: "Dashboard", path: "/employee/dashboard", icon: <FaHome /> },
    { text: "Profile", path: "/employee/profile", icon: <FaUserCircle /> },
  ];

  const isMainPage = location.pathname === "/employee/dashboard";

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#282c34" }}>
      <Sidebar links={links} />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            flexGrow: 1,
            p: 4,
            backgroundColor: "#fefefe",
            mt: 8,
            borderRadius: isMainPage ? "0 1rem 1rem 1rem" : "1rem",
            transition: "all .3s ease",
          }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
