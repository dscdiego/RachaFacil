import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid, Card, CardContent, Typography,
  Button, Box, Avatar, Divider
} from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SportsSoccerRoundedIcon from "@mui/icons-material/SportsSoccerRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ProprietarioLayout from "../../components/ProprietarioLayout";

const acoes = [
  {
    label: "Minhas Arenas",
    desc: "3 arenas cadastradas",
    path: "/proprietario/minhas-arenas",
    icon: <SportsSoccerRoundedIcon fontSize="small" />,
    iconBg: "#fef3c7",
    iconColor: "#d97706",
  },
  {
    label: "Reservas",
    desc: "5 reservas esta semana",
    path: "/proprietario/reservas",
    icon: <EventAvailableRoundedIcon fontSize="small" />,
    iconBg: "#dbeafe",
    iconColor: "#1d4ed8",
  },
  {
    label: "Financeiro",
    desc: "R$ 8.540 este mês",
    path: "/proprietario/financeiro",
    icon: <AttachMoneyRoundedIcon fontSize="small" />,
    iconBg: "#dcfce7",
    iconColor: "#16a34a",
  },
];

export default function PerfilProprietario({ onLogout }) {
  const navigate = useNavigate();

  const handleSair = () => {
    if (onLogout) onLogout();
    navigate("/proprietario");
  };

  return (
    <ProprietarioLayout
      title="Perfil"
      subtitle="Gerencie suas informações e configurações."
    >
      <Grid container spacing={2}>
        {/* Card do perfil */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                py: 4,
                px: 3,
              }}
            >
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mb: 2,
                  backgroundColor: "#16a34a",
                  fontSize: "2rem",
                }}
              >
                <PersonRoundedIcon sx={{ fontSize: 42 }} />
              </Avatar>

              <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827" }}>
                Nome do Proprietário
              </Typography>

              <Typography variant="body2" sx={{ color: "#6b7280", mt: 0.5, fontSize: "0.85rem" }}>
                proprietario@email.com
              </Typography>

              <Divider sx={{ width: "100%", my: 2.5 }} />

              <Grid container spacing={2} sx={{ textAlign: "center" }}>
                {[
                  { label: "Arenas",   valor: "3" },
                  { label: "Reservas", valor: "64" },
                  { label: "Meses",    valor: "8" },
                ].map((stat) => (
                  <Grid item xs={4} key={stat.label}>
                    <Typography sx={{ fontWeight: 800, fontSize: "1.2rem", color: "#111827" }}>
                      {stat.valor}
                    </Typography>
                    <Typography sx={{ fontSize: "0.72rem", color: "#9ca3af" }}>
                      {stat.label}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Ações rápidas */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <CardContent sx={{ p: "20px !important" }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#111827" }}>
                Ações rápidas
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {acoes.map((acao) => (
                  <Box
                    key={acao.path}
                    onClick={() => navigate(acao.path)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 1.5,
                      borderRadius: "12px",
                      border: "1px solid #f3f4f6",
                      cursor: "pointer",
                      transition: "all 0.15s",
                      "&:hover": {
                        backgroundColor: "#f9fafb",
                        borderColor: "#e5e7eb",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: "10px",
                        backgroundColor: acao.iconBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        "& svg": { color: acao.iconColor },
                      }}
                    >
                      {acao.icon}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: "0.875rem", color: "#111827" }}>
                        {acao.label}
                      </Typography>
                      <Typography sx={{ fontSize: "0.78rem", color: "#9ca3af" }}>
                        {acao.desc}
                      </Typography>
                    </Box>
                    <ChevronRightRoundedIcon sx={{ fontSize: 18, color: "#d1d5db" }} />
                  </Box>
                ))}
              </Box>

              <Button
                variant="outlined"
                color="error"
                fullWidth
                startIcon={<LogoutRoundedIcon />}
                onClick={handleSair}
                sx={{
                  mt: 3,
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 700,
                  py: 1.25,
                }}
              >
                Sair da conta
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ProprietarioLayout>
  );
}