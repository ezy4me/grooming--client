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
          backgroundColor: "#282c34", 
          color: "#ffffff", 
          borderRight: 'none', 
        },
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor={"#282c34"} 
        py={2}
        gap={1}
      >
        <FaPaw size={24} color="#ffffff" />
        <Typography variant="h6" color="#ffffff" fontWeight="bold" >
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
                location.pathname === path ? "#ffffff" : "transparent", 
              "&:hover": {
                backgroundColor: location.pathname === path ? "#ff3881" : "#333", 
              },
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === path ? "#000000" : "#ffffff" }}>
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={text}
              sx={{
                fontWeight: location.pathname === path ? "bold" : "normal", 
                color: location.pathname === path ? "#000000" : "#ffffff", 
              }}
            />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ borderColor: "#444", my: 2 }} />

      <List>
        <ListItemButton onClick={handleLogout} sx={{ paddingY: 1.5 }}>
          <ListItemIcon sx={{ color: "#ffffff", fontWeight: "bold" }}>
            <FaSignOutAlt color="error" />
          </ListItemIcon>
          <ListItemText primary="Выход" sx={{ color: "#ffffff", fontWeight: "bold" }} />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
