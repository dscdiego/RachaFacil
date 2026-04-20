import React from "react";
import {
  Grid, Card, CardContent, CardActions,
  Button, Typography, Box, Chip
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import SportsSoccerRoundedIcon from "@mui/icons-material/SportsSoccerRounded";
import ProprietarioLayout from "../../components/ProprietarioLayout";

const arenas = [
  {
    nome: "Arena Society 1",
    local: "Fortaleza - CE",
    tipo: "Society",
    preco: "R$ 120/h",
    status: "Ativa",
    descricao: "Campo society gramado com iluminação noturna.",
  },
  {
    nome: "Arena Society 2",
    local: "Fortaleza - CE",
    tipo: "Society",
    preco: "R$ 100/h",
    status: "Ativa",
    descricao: "Campo coberto com vestiários e estacionamento.",
  },
  {
    nome: "Arena Fut7",
    local: "Fortaleza - CE",
    tipo: "Fut7",
    preco: "R$ 150/h",
    status: "Em análise",
    descricao: "Campo de futebol 7 com gramado sintético.",
  },
];

const statusStyles = {
  Ativa:       { bg: "#dcfce7", color: "#166534" },
  "Em análise": { bg: "#fef3c7", color: "#92400e" },
  Inativa:     { bg: "#fee2e2", color: "#991b1b" },
};

export default function MinhasArenas() {
  return (
    <ProprietarioLayout
      title="Minhas Arenas"
      subtitle="Gerencie suas arenas cadastradas."
    >
      {/* Botão alinhado à direita */}
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
          Nova Arena
        </Button>
      </Box>

      <Grid container spacing={2}>
        {arenas.map((arena, index) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "box-shadow 0.2s",
                "&:hover": { boxShadow: "0 6px 20px rgba(0,0,0,0.1)" },
              }}
            >
              {/* Faixa colorida no topo do card */}
              <Box
                sx={{
                  height: 6,
                  backgroundColor:
                    arena.status === "Ativa" ? "#16a34a" : "#d97706",
                  borderRadius: "12px 12px 0 0",
                }}
              />

              <CardContent sx={{ flex: 1, p: "16px !important" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 1,
                    mb: 1.5,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 800, color: "#111827", fontSize: "1rem", lineHeight: 1.3 }}
                  >
                    {arena.nome}
                  </Typography>
                  <Chip
                    label={arena.status}
                    size="small"
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.7rem",
                      height: 24,
                      backgroundColor: statusStyles[arena.status]?.bg,
                      color: statusStyles[arena.status]?.color,
                    }}
                  />
                </Box>

                <Typography variant="body2" sx={{ color: "#6b7280", mb: 0.75, fontSize: "0.82rem" }}>
                  {arena.descricao}
                </Typography>

                <Box sx={{ display: "flex", gap: 2, mt: 1.5, flexWrap: "wrap" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <PlaceRoundedIcon sx={{ fontSize: 14, color: "#9ca3af" }} />
                    <Typography sx={{ fontSize: "0.78rem", color: "#6b7280" }}>{arena.local}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <SportsSoccerRoundedIcon sx={{ fontSize: 14, color: "#9ca3af" }} />
                    <Typography sx={{ fontSize: "0.78rem", color: "#6b7280" }}>{arena.tipo}</Typography>
                  </Box>
                </Box>

                <Typography
                  sx={{
                    mt: 2,
                    color: "#16a34a",
                    fontWeight: 800,
                    fontSize: "1.05rem",
                  }}
                >
                  {arena.preco}
                </Typography>
              </CardContent>

              <CardActions sx={{ px: 2, pb: 2, pt: 0, gap: 1 }}>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    borderRadius: "10px",
                    textTransform: "none",
                    fontWeight: 700,
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
                  sx={{
                    borderRadius: "10px",
                    textTransform: "none",
                    fontWeight: 700,
                    flex: 1,
                  }}
                >
                  Excluir
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </ProprietarioLayout>
  );
}