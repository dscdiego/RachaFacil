import React, { useEffect } from "react";
import {
  Grid, Card, CardContent, Typography,
  Box, Divider, CircularProgress
} from "@mui/material";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import SportsSoccerRoundedIcon from "@mui/icons-material/SportsSoccerRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { useDispatch, useSelector } from "react-redux";
import {
  getDashboardThunk,
  selectDashboard,
  selectDashboardLoading,
} from "../../store/slices/dashboardSlice";
import ProprietarioLayout from "../../components/ProprietarioLayout";

const statusStyles = {
  CONFIRMADA: { bg: "#dcfce7", color: "#166534", label: "Confirmada" },
  PENDENTE:   { bg: "#fef3c7", color: "#92400e", label: "Pendente"   },
  CANCELADA:  { bg: "#fee2e2", color: "#991b1b", label: "Cancelada"  },
};

export default function Dashboard() {
  const dispatch  = useDispatch();
  const dados     = useSelector(selectDashboard);
  const loading   = useSelector(selectDashboardLoading);

  useEffect(() => { dispatch(getDashboardThunk()); }, [dispatch]);

  const cards = dados ? [
    { titulo: "Reservas hoje",       valor: String(dados.reservasHoje ?? 0),                             icon: <TodayRoundedIcon />,         iconBg: "#dbeafe", iconColor: "#1d4ed8" },
    { titulo: "Faturamento do dia",  valor: `R$ ${Number(dados.faturamentoDia ?? 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`, icon: <AttachMoneyRoundedIcon />,  iconBg: "#dcfce7", iconColor: "#16a34a" },
    { titulo: "Arenas ativas",       valor: String(dados.arenasAtivas ?? 0),                             icon: <SportsSoccerRoundedIcon />,  iconBg: "#fef3c7", iconColor: "#d97706" },
    { titulo: "Horários disponíveis",valor: String(dados.horariosDisponiveis ?? 0),                      icon: <AccessTimeRoundedIcon />,    iconBg: "#fce7f3", iconColor: "#be185d" },
  ] : [];

  return (
    <ProprietarioLayout title="Dashboard" subtitle="Acompanhe o desempenho das suas arenas em tempo real.">
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress sx={{ color: "#16a34a" }} />
        </Box>
      ) : (
        <>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {cards.map((item) => (
              <Grid item xs={6} sm={6} lg={3} key={item.titulo}>
                <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", height: "100%" }}>
                  <CardContent sx={{ p: "16px !important" }}>
                    <Box sx={{ width: 40, height: 40, borderRadius: "10px", backgroundColor: item.iconBg, display: "flex", alignItems: "center", justifyContent: "center", mb: 1.5, "& svg": { fontSize: 20, color: item.iconColor } }}>
                      {item.icon}
                    </Box>
                    <Typography variant="body2" sx={{ color: "#6b7280", mb: 0.5, fontSize: "0.8rem" }}>{item.titulo}</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827", lineHeight: 1 }}>{item.valor}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <CardContent sx={{ p: "20px !important" }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#111827" }}>Últimas reservas</Typography>
              {(dados?.ultimasReservas || []).length === 0 ? (
                <Typography sx={{ color: "#9ca3af", fontSize: "0.88rem" }}>Nenhuma reserva ainda.</Typography>
              ) : (
                (dados?.ultimasReservas || []).map((r, i, arr) => (
                  <React.Fragment key={r.id}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1.5, flexWrap: "wrap", gap: 1 }}>
                      <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: "0.9rem", color: "#111827" }}>{r.nomeArena}</Typography>
                        <Typography sx={{ fontSize: "0.8rem", color: "#6b7280" }}>{r.horario} · {r.data}</Typography>
                      </Box>
                      <Box sx={{ px: 1.5, py: 0.4, borderRadius: "99px", fontSize: "0.75rem", fontWeight: 700, backgroundColor: statusStyles[r.status]?.bg, color: statusStyles[r.status]?.color }}>
                        {statusStyles[r.status]?.label || r.status}
                      </Box>
                    </Box>
                    {i < arr.length - 1 && <Divider />}
                  </React.Fragment>
                ))
              )}
            </CardContent>
          </Card>
        </>
      )}
    </ProprietarioLayout>
  );
}
