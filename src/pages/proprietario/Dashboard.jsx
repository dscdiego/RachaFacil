import React from "react";
import {
  Grid, Card, CardContent, Typography, Box, Divider
} from "@mui/material";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import SportsSoccerRoundedIcon from "@mui/icons-material/SportsSoccerRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ProprietarioLayout from "../../components/ProprietarioLayout";

const cards = [
  {
    titulo: "Reservas hoje",
    valor: "18",
    icon: <TodayRoundedIcon />,
    iconBg: "#dbeafe",
    iconColor: "#1d4ed8",
  },
  {
    titulo: "Faturamento do dia",
    valor: "R$ 1.240",
    icon: <AttachMoneyRoundedIcon />,
    iconBg: "#dcfce7",
    iconColor: "#16a34a",
  },
  {
    titulo: "Arenas ativas",
    valor: "3",
    icon: <SportsSoccerRoundedIcon />,
    iconBg: "#fef3c7",
    iconColor: "#d97706",
  },
  {
    titulo: "Horários disponíveis",
    valor: "12",
    icon: <AccessTimeRoundedIcon />,
    iconBg: "#fce7f3",
    iconColor: "#be185d",
  },
];

const ultimasReservas = [
  { cliente: "Lucas Andrade",  arena: "Arena Society 1", horario: "18:00", status: "Confirmada" },
  { cliente: "Ana Beatriz",    arena: "Arena Society 2", horario: "19:30", status: "Pendente" },
  { cliente: "Pedro Henrique", arena: "Arena Fut7",      horario: "20:00", status: "Cancelada" },
];

const statusColor = {
  Confirmada: { bg: "#dcfce7", color: "#166534" },
  Pendente:   { bg: "#fef3c7", color: "#92400e" },
  Cancelada:  { bg: "#fee2e2", color: "#991b1b" },
};

export default function Dashboard() {
  return (
    <ProprietarioLayout
      title="Dashboard"
      subtitle="Acompanhe o desempenho das suas arenas em tempo real."
    >
      {/* Cards de métricas */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {cards.map((item) => (
          <Grid item xs={6} sm={6} lg={3} key={item.titulo}>
            <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", height: "100%" }}>
              <CardContent sx={{ p: "16px !important" }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "10px",
                    backgroundColor: item.iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 1.5,
                    "& svg": { fontSize: 20, color: item.iconColor },
                  }}
                >
                  {item.icon}
                </Box>
                <Typography variant="body2" sx={{ color: "#6b7280", mb: 0.5, fontSize: "0.8rem" }}>
                  {item.titulo}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827", lineHeight: 1 }}>
                  {item.valor}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Últimas reservas */}
      <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <CardContent sx={{ p: "20px !important" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#111827" }}>
            Últimas reservas
          </Typography>
          {ultimasReservas.map((r, i) => (
            <React.Fragment key={i}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 1.5,
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: "0.9rem", color: "#111827" }}>
                    {r.cliente}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#6b7280" }}>
                    {r.arena} · {r.horario}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    px: 1.5,
                    py: 0.4,
                    borderRadius: "99px",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    backgroundColor: statusColor[r.status]?.bg,
                    color: statusColor[r.status]?.color,
                  }}
                >
                  {r.status}
                </Box>
              </Box>
              {i < ultimasReservas.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </CardContent>
      </Card>
    </ProprietarioLayout>
  );
}