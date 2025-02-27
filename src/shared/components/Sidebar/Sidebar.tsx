import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

interface SidebarProps {
  links: { text: string; path: string; icon: React.ReactNode }[];
}

const drawerWidth = 240;

const Sidebar: React.FC<SidebarProps> = ({ links }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Получаем текущий маршрут

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#fafafa",
          color: "#121212",
        },
      }}>
      <List sx={{ flexGrow: 1, padding: 0 }}>
        {links.map(({ text, path, icon }) => (
          <ListItemButton
            key={path}
            component={Link}
            to={path}
            sx={{
              paddingY: 1.5,
              backgroundColor:
                location.pathname === path ? "#d1e7ff" : "transparent",
              "&:hover": {
                backgroundColor:
                  location.pathname === path ? "#a6c8ff" : "#f4f4f4",
              },
            }}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        ))}
      </List>

      <Divider />

      <List>
        <ListItemButton onClick={handleLogout} sx={{ paddingY: 1.5 }}>
          <ListItemIcon>
            <FaSignOutAlt color="error" />
          </ListItemIcon>
          <ListItemText primary="Выход" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
