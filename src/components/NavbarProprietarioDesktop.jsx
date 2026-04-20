import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SportsSoccerRoundedIcon from "@mui/icons-material/SportsSoccerRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { useNavigate, useLocation } from "react-router-dom";

export default function NavbarProprietarioDesktop() {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { label: "Dashboard",  path: "/proprietario/dashboard",    icon: <DashboardRoundedIcon fontSize="small" /> },
    { label: "Arenas",     path: "/proprietario/minhas-arenas", icon: <SportsSoccerRoundedIcon fontSize="small" /> },
    { label: "Reservas",   path: "/proprietario/reservas",     icon: <EventAvailableRoundedIcon fontSize="small" /> },
    { label: "Horários",   path: "/proprietario/horarios",     icon: <AccessTimeRoundedIcon fontSize="small" /> },
    { label: "Financeiro", path: "/proprietario/financeiro",   icon: <AttachMoneyRoundedIcon fontSize="small" /> },
    { label: "Perfil",     path: "/proprietario/perfil",       icon: <PersonRoundedIcon fontSize="small" /> },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        color: "#111827",
        borderBottom: "1px solid #e5e7eb",
        display: { xs: "none", md: "block" },
      }}
    >
      <Toolbar sx={{ minHeight: "68px !important", px: { md: 3, lg: 5 }, gap: 2 }}>
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mr: 3,
            cursor: "pointer",
            flexShrink: 0,
          }}
          onClick={() => navigate("/proprietario/dashboard")}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "8px",
              backgroundColor: "#16a34a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SportsSoccerIcon sx={{ fontSize: 18, color: "#fff" }} />
          </Box>
          <Typography sx={{ fontWeight: 800, fontSize: "1rem", color: "#111827", letterSpacing: "-0.01em" }}>
            RachaFácil
          </Typography>
        </Box>

        {/* Nav links */}
        <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", flex: 1 }}>
          {links.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Button
                key={item.path}
                startIcon={item.icon}
                onClick={() => navigate(item.path)}
                sx={{
                  color: active ? "#16a34a" : "#374151",
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: "0.875rem",
                  borderRadius: "10px",
                  px: 2,
                  py: 1,
                  backgroundColor: active ? "#f0fdf4" : "transparent",
                  "&:hover": {
                    backgroundColor: active ? "#dcfce7" : "#f9fafb",
                  },
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
}