import React from "react";
import {
  Grid, Card, CardContent, Typography,
  Box, Button, Divider
} from "@mui/material";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ProprietarioLayout from "../../components/ProprietarioLayout";

const resumo = [
  {
    titulo: "Faturamento do mês",
    valor: "R$ 8.540",
    icon: <TrendingUpRoundedIcon />,
    iconBg: "#dcfce7",
    iconColor: "#16a34a",
  },
  {
    titulo: "Reservas confirmadas",
    valor: "64",
    icon: <EventAvailableRoundedIcon />,
    iconBg: "#dbeafe",
    iconColor: "#1d4ed8",
  },
  {
    titulo: "Pendências",
    valor: "R$ 1.120",
    icon: <WarningAmberRoundedIcon />,
    iconBg: "#fef3c7",
    iconColor: "#d97706",
  },
];

const movimentacoes = [
  { descricao: "Reserva - Arena Society 1", data: "20/04/2026", valor: "R$ 120,00", tipo: "entrada" },
  { descricao: "Reserva - Arena Fut7",      data: "20/04/2026", valor: "R$ 150,00", tipo: "entrada" },
  { descricao: "Estorno - Arena Society 2", data: "19/04/2026", valor: "R$ 100,00", tipo: "saida"   },
  { descricao: "Reserva - Arena Society 2", data: "19/04/2026", valor: "R$ 120,00", tipo: "entrada" },
];

export default function Financeiro() {
  return (
    <ProprietarioLayout
      title="Financeiro"
      subtitle="Acompanhe receitas, movimentações e resultados das suas arenas."
    >
      {/* Cards de resumo */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {resumo.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
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
                <Typography variant="body2" sx={{ color: "#6b7280", fontSize: "0.8rem", mb: 0.5 }}>
                  {item.titulo}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827" }}>
                  {item.valor}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Movimentações */}
      <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <CardContent sx={{ p: "20px !important" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
              mb: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827" }}>
              Últimas movimentações
            </Typography>
            <Button
              variant="outlined"
              size="small"
              startIcon={<FileDownloadRoundedIcon />}
              sx={{
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 700,
                borderColor: "#e5e7eb",
                color: "#374151",
                "&:hover": { borderColor: "#d1d5db", backgroundColor: "#f9fafb" },
              }}
            >
              Exportar
            </Button>
          </Box>

          {movimentacoes.map((item, index) => (
            <React.Fragment key={index}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 1.5,
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      backgroundColor: item.tipo === "entrada" ? "#dcfce7" : "#fee2e2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {item.tipo === "entrada"
                      ? <ArrowUpwardRoundedIcon sx={{ fontSize: 16, color: "#16a34a" }} />
                      : <ArrowDownwardRoundedIcon sx={{ fontSize: 16, color: "#dc2626" }} />
                    }
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: "0.875rem", color: "#111827" }}>
                      {item.descricao}
                    </Typography>
                    <Typography sx={{ fontSize: "0.78rem", color: "#9ca3af" }}>
                      {item.data}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    color: item.tipo === "entrada" ? "#16a34a" : "#dc2626",
                  }}
                >
                  {item.tipo === "entrada" ? "+" : "-"}{item.valor}
                </Typography>
              </Box>
              {index < movimentacoes.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </CardContent>
      </Card>
    </ProprietarioLayout>
  );
}