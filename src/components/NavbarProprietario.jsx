import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SportsSoccerRoundedIcon from "@mui/icons-material/SportsSoccerRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { useNavigate, useLocation } from "react-router-dom";

export default function NavbarProprietario() {
  const navigate = useNavigate();
  const location = useLocation();

  const routes = [
    "/proprietario/dashboard",
    "/proprietario/minhas-arenas",
    "/proprietario/reservas",
    "/proprietario/horarios",
    "/proprietario/financeiro",
    "/proprietario/perfil",
  ];

  const value = (() => {
    const idx = routes.indexOf(location.pathname);
    return idx >= 0 ? idx : 0;
  })();

  const handleChange = (event, newValue) => {
    navigate(routes[newValue]);
  };

  return (
    <Paper
      elevation={4}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        borderTop: "1px solid #e5e7eb",
        zIndex: 1200,
        backgroundColor: "#ffffff",
        display: { xs: "block", md: "none" },
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
        sx={{
          height: 64,
          backgroundColor: "#ffffff",
          "& .MuiBottomNavigationAction-root": {
            minWidth: 0,
            maxWidth: "unset",
            padding: "8px 4px 6px",
            color: "#9ca3af",
          },
          "& .MuiSvgIcon-root": {
            fontSize: 22,
          },
          "& .MuiBottomNavigationAction-label": {
            fontSize: "0.6rem",
            fontWeight: 600,
            lineHeight: 1.2,
            marginTop: "2px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: 52,
          },
          "& .Mui-selected": {
            color: "#16a34a",
          },
          "& .Mui-selected .MuiBottomNavigationAction-label": {
            fontSize: "0.6rem",
            color: "#16a34a",
          },
        }}
      >
        <BottomNavigationAction label="Painel"    icon={<DashboardRoundedIcon />} />
        <BottomNavigationAction label="Arenas"    icon={<SportsSoccerRoundedIcon />} />
        <BottomNavigationAction label="Reservas"  icon={<EventAvailableRoundedIcon />} />
        <BottomNavigationAction label="Horários"  icon={<AccessTimeRoundedIcon />} />
        <BottomNavigationAction label="Financeiro" icon={<AttachMoneyRoundedIcon />} />
        <BottomNavigationAction label="Perfil"    icon={<PersonRoundedIcon />} />
      </BottomNavigation>
    </Paper>
  );
}