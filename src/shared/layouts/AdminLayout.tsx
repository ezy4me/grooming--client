import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { Box } from "@mui/material";
import { FaHome, FaUserTie, FaClipboardList, FaUsers } from "react-icons/fa";

const AdminLayout: React.FC = () => {
  const links = [
    { text: "Категории услуг", path: "/admin/categories", icon: <FaClipboardList /> }, // Иконка для категорий услуг
    { text: "Услуги", path: "/admin/services", icon: <FaHome /> }, // Иконка для услуг
    { text: "Клиенты", path: "/admin/clients", icon: <FaUsers /> }, // Иконка для клиентов
    { text: "Работники", path: "/admin/employees", icon: <FaUserTie /> }, // Иконка для работников
    { text: "Записи", path: "/admin/appointments", icon: <FaClipboardList /> }, // Иконка для записей
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#d81b60" }}>
      <Sidebar links={links} />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ flexGrow: 1, p: 2, backgroundColor: "#fefefe", mt: 8 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
