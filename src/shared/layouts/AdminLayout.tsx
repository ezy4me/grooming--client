import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { Box } from "@mui/material";
import { FaHome, FaUserTie, FaClipboardList, FaUsers } from "react-icons/fa";

const AdminLayout: React.FC = () => {
  const location = useLocation(); 

  const links = [
    { text: "Пользователи", path: "/admin/users", icon: <FaUsers /> },
    {
      text: "Категории услуг",
      path: "/admin/categories",
      icon: <FaClipboardList />,
    },
    { text: "Услуги", path: "/admin/services", icon: <FaHome /> },
    { text: "Клиенты", path: "/admin/clients", icon: <FaUsers /> },
    { text: "Сотрудники", path: "/admin/employees", icon: <FaUserTie /> },
    { text: "Записи", path: "/admin/appointments", icon: <FaClipboardList /> },
  ];

  const isUsersPage = location.pathname === "/admin/users";

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#282c34",  }}>
      <Sidebar links={links} />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", overflow: "hidden"}}>
        <Box
          sx={{
            flexGrow: 1,
            p: 2,
            backgroundColor: "#fefefe",
            mt: 8,
            borderRadius: isUsersPage ? "0 1rem 1rem 1rem" : "1rem", 
            transition: "all .3s ease",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
