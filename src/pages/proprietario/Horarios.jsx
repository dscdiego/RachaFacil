import React from "react";
import {
  Grid, Card, CardContent, CardActions,
  Typography, Button, Box, Chip
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ProprietarioLayout from "../../components/ProprietarioLayout";

const horarios = [
  { hora: "08:00", arena: "Arena Society 1", status: "Disponível" },
  { hora: "10:00", arena: "Arena Society 1", status: "Ocupado" },
  { hora: "14:00", arena: "Arena Society 2", status: "Disponível" },
  { hora: "16:00", arena: "Arena Fut7",      status: "Ocupado" },
  { hora: "18:00", arena: "Arena Society 1", status: "Disponível" },
  { hora: "20:00", arena: "Arena Fut7",      status: "Disponível" },
];

const statusStyles = {
  Disponível: { bg: "#dcfce7", color: "#166534" },
  Ocupado:    { bg: "#fee2e2", color: "#991b1b" },
  Bloqueado:  { bg: "#f3f4f6", color: "#374151" },
};

export default function Horarios() {
  return (
    <ProprietarioLayout
      title="Controle de Horários"
      subtitle="Organize os horários das suas arenas."
    >
      <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 700,
            backgroundColor: "#16a34a",
            "&:hover": { backgroundColor: "#15803d" },
            px: 3,
          }}
        >
          Adicionar horário
        </Button>
      </Box>

      <Grid container spacing={2}>
        {horarios.map((horario, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "box-shadow 0.2s",
                "&:hover": { boxShadow: "0 6px 16px rgba(0,0,0,0.09)" },
              }}
            >
              <CardContent sx={{ flex: 1, p: "16px !important" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1.5,
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 800, color: "#111827", fontSize: "1.6rem" }}
                  >
                    {horario.hora}
                  </Typography>
                  <Chip
                    label={horario.status}
                    size="small"
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.7rem",
                      height: 24,
                      backgroundColor: statusStyles[horario.status]?.bg,
                      color: statusStyles[horario.status]?.color,
                    }}
                  />
                </Box>
                <Typography variant="body2" sx={{ color: "#6b7280", fontSize: "0.82rem" }}>
                  {horario.arena}
                </Typography>
              </CardContent>

              <CardActions sx={{ px: 2, pb: 2, pt: 0, gap: 1 }}>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<EditRoundedIcon sx={{ fontSize: "14px !important" }} />}
                  sx={{
                    borderRadius: "10px",
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    backgroundColor: "#16a34a",
                    "&:hover": { backgroundColor: "#15803d" },
                    flex: 1,
                  }}
                >
                  Editar
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<LockRoundedIcon sx={{ fontSize: "14px !important" }} />}
                  sx={{
                    borderRadius: "10px",
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    flex: 1,
                  }}
                >
                  Bloquear
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </ProprietarioLayout>
  );
}