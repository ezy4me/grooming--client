import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { Box } from "@mui/material";
import { FaCog, FaHome, FaUser } from "react-icons/fa";

const AdminLayout: React.FC = () => {
  const links = [
    { text: "Dashboard", path: "/admin/dashboard", icon: <FaHome /> },
    { text: "Users", path: "/admin/users", icon: <FaUser /> },
    { text: "Settings", path: "/admin/settings", icon: <FaCog /> },
  ];

  return (
      <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f7f7f7" }}>
        <Sidebar links={links} />
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Box sx={{ flexGrow: 1, p: 4, backgroundColor: "#fefefe", mt: 8 }}>
            <Outlet/>
          </Box>
        </Box>
      </Box>
  );
};

export default AdminLayout;
