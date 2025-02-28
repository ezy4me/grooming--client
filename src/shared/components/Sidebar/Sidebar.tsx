import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaSignOutAlt, FaPaw } from "react-icons/fa";

interface SidebarProps {
  links: { text: string; path: string; icon: React.ReactNode }[];
}

const drawerWidth = 240;

const Sidebar: React.FC<SidebarProps> = ({ links }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor={"#1ba9d8"}
        py={2}
        gap={1}>
        <FaPaw size={20} color="#000000" />
        <Typography variant="h6" fontWeight="bold">
          мягкие лапки
        </Typography>
      </Box>

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
