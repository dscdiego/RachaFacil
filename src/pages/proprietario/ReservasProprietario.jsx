import React, { useState } from "react";
import {
  Grid, Card, CardContent, Typography,
  Box, Chip, Button, ToggleButton, ToggleButtonGroup
} from "@mui/material";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import ProprietarioLayout from "../../components/ProprietarioLayout";

const reservas = [
  { cliente: "Lucas Andrade",  arena: "Arena Society 1", data: "20/04/2026", horario: "18:00", status: "Confirmada" },
  { cliente: "Ana Beatriz",    arena: "Arena Society 2", data: "20/04/2026", horario: "19:30", status: "Pendente"   },
  { cliente: "Pedro Henrique", arena: "Arena Fut7",      data: "21/04/2026", horario: "20:00", status: "Cancelada"  },
  { cliente: "Marcos Lima",    arena: "Arena Society 1", data: "21/04/2026", horario: "16:00", status: "Confirmada" },
  { cliente: "Julia Souza",    arena: "Arena Fut7",      data: "22/04/2026", horario: "08:00", status: "Pendente"   },
];

const statusStyles = {
  Confirmada: { bg: "#dcfce7", color: "#166534" },
  Pendente:   { bg: "#fef3c7", color: "#92400e" },
  Cancelada:  { bg: "#fee2e2", color: "#991b1b" },
};

export default function ReservasProprietario() {
  const [filtro, setFiltro] = useState("Todas");

  const filtradas = filtro === "Todas"
    ? reservas
    : reservas.filter((r) => r.status === filtro);

  const handleFiltro = (_, novoFiltro) => {
    if (novoFiltro !== null) setFiltro(novoFiltro);
  };

  return (
    <ProprietarioLayout
      title="Reservas"
      subtitle="Acompanhe todas as reservas das suas arenas."
    >
      {/* Barra de filtros + exportar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        <ToggleButtonGroup
          value={filtro}
          exclusive
          onChange={handleFiltro}
          size="small"
          sx={{
            "& .MuiToggleButton-root": {
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.8rem",
              borderRadius: "10px !important",
              border: "1px solid #e5e7eb !important",
              px: 2,
              color: "#374151",
              "&.Mui-selected": {
                backgroundColor: "#16a34a",
                color: "#fff",
                borderColor: "#16a34a !important",
                "&:hover": { backgroundColor: "#15803d" },
              },
            },
            gap: 0.75,
          }}
        >
          {["Todas", "Confirmada", "Pendente", "Cancelada"].map((s) => (
            <ToggleButton key={s} value={s}>{s}</ToggleButton>
          ))}
        </ToggleButtonGroup>

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
            alignSelf: { xs: "flex-end", sm: "auto" },
          }}
        >
          Exportar
        </Button>
      </Box>

      <Typography variant="body2" sx={{ color: "#6b7280", mb: 2 }}>
        {filtradas.length} reserva{filtradas.length !== 1 ? "s" : ""} encontrada{filtradas.length !== 1 ? "s" : ""}
      </Typography>

      <Grid container spacing={2}>
        {filtradas.map((reserva, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                height: "100%",
                transition: "box-shadow 0.2s",
                "&:hover": { boxShadow: "0 6px 16px rgba(0,0,0,0.09)" },
              }}
            >
              <CardContent sx={{ p: "16px !important" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 1,
                    mb: 1.5,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", fontSize: "0.95rem" }}>
                    {reserva.cliente}
                  </Typography>
                  <Chip
                    label={reserva.status}
                    size="small"
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.7rem",
                      height: 24,
                      backgroundColor: statusStyles[reserva.status]?.bg,
                      color: statusStyles[reserva.status]?.color,
                    }}
                  />
                </Box>

                <Typography variant="body2" sx={{ color: "#6b7280", mb: 0.5, fontSize: "0.82rem" }}>
                  <strong>Arena:</strong> {reserva.arena}
                </Typography>
                <Typography variant="body2" sx={{ color: "#6b7280", mb: 0.5, fontSize: "0.82rem" }}>
                  <strong>Data:</strong> {reserva.data} · <strong>Horário:</strong> {reserva.horario}
                </Typography>

                <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      borderRadius: "10px",
                      textTransform: "none",
                      fontWeight: 700,
                      fontSize: "0.78rem",
                      borderColor: "#e5e7eb",
                      color: "#374151",
                    }}
                  >
                    Ver detalhes
                  </Button>
                  {reserva.status === "Pendente" && (
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        borderRadius: "10px",
                        textTransform: "none",
                        fontWeight: 700,
                        fontSize: "0.78rem",
                        backgroundColor: "#16a34a",
                        "&:hover": { backgroundColor: "#15803d" },
                      }}
                    >
                      Confirmar
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </ProprietarioLayout>
  );
}