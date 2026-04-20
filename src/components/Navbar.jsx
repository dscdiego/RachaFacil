import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      label: "Início",
      icon: <HomeIcon />,
      path: "/buscar",
      activePaths: ["/buscar", "/arena"]
    },
    {
      label: "Reservas",
      icon: <EventIcon />,
      path: "/reservas",
      activePaths: ["/reservas", "/pagamento"]
    },
    {
      label: "Perfil",
      icon: <PersonIcon />,
      path: "/perfil",
      activePaths: ["/perfil"]
    }
  ];

  const value = tabs.findIndex((tab) =>
    tab.activePaths.includes(location.pathname)
  );

  const handleChange = (event, newValue) => {
    navigate(tabs[newValue].path);
  };

  return (
    <BottomNavigation
      value={value === -1 ? 0 : value}
      onChange={handleChange}
      showLabels
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderTop: "1px solid #e5e7eb",
        backgroundColor: "#fff",
        height: 68,
        boxShadow: "0 -2px 10px rgba(0,0,0,0.06)",

        "& .MuiBottomNavigationAction-root": {
          minWidth: 0,
          color: "#6b7280",
          transition: "0.2s"
        },

        "& .Mui-selected": {
          color: "#22c55e"
        }
      }}
    >
      <BottomNavigationAction
        label="Início"
        icon={<HomeIcon />}
      />

      <BottomNavigationAction
        label="Reservas"
        icon={<EventIcon />}
      />

      <BottomNavigationAction
        label="Perfil"
        icon={<PersonIcon />}
      />
    </BottomNavigation>
  );
}