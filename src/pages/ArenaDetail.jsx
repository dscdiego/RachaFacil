import React, { useState } from "react";
import {
  Box, Typography, Card, CardContent, Button, Container, Avatar
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const horariosMock = [
  { hora: "17:00", status: "Ocupado",    preco: null },
  { hora: "18:00", status: "Disponível", preco: 120 },
  { hora: "19:00", status: "Ocupado",    preco: null },
  { hora: "20:00", status: "Disponível", preco: 100 },
];

const comentariosMock = [
  { usuario: "Pedro Silva", rating: 4, texto: "Ótima quadra! O espaço é excelente e o atendimento também.", tempo: "Há 1 semana" },
  { usuario: "Ana Costa",   rating: 5, texto: "Lugar top! Recomendo demais!", tempo: "Há 3 semanas" },
];

function RatingStars({ value, max = 5 }) {
  return (
    <Box sx={{ display: "flex", gap: 0.25 }}>
      {Array.from({ length: max }).map((_, i) =>
        i < value
          ? <StarIcon key={i} sx={{ fontSize: 16, color: "#f59e0b" }} />
          : <StarBorderIcon key={i} sx={{ fontSize: 16, color: "#d1d5db" }} />
      )}
    </Box>
  );
}

function getInitials(name) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

export default function ArenaDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedHora, setSelectedHora] = useState(null);

  const arena = location.state || {
    id: 1, nome: "Arena Society", rating: 4.7,
    esportes: ["Futebol Society", "Fut7"], preco: 120,
    imagem: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
  };

  const handleContinuar = () => {
    if (!selectedHora) return;
    const preco = horariosMock.find((h) => h.hora === selectedHora)?.preco || arena.preco;
    navigate("/pagamento", {
      state: {
        id: Date.now(),
        arena: arena.nome,
        horario: `${selectedHora} - 1h`,
        data: "Hoje",
        status: "Pendente",
        valor: preco,
      },
    });
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f7f9", pb: 14 }}>
      {/* Imagem topo */}
      <Box sx={{ position: "relative", width: "100%", height: { xs: 230, sm: 280 } }}>
        <Box
          component="img" src={arena.imagem} alt={arena.nome}
          sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <Button
          onClick={() => navigate(-1)}
          sx={{
            position: "absolute", top: 16, left: 16,
            minWidth: 0, width: 40, height: 40, borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.92)", color: "#2d2d2d",
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            "&:hover": { backgroundColor: "#fff" },
          }}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: 17 }} />
        </Button>
      </Box>

      <Container maxWidth="sm" sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Card principal */}
        <Card
          sx={{
            mt: -3, borderRadius: 4, position: "relative", zIndex: 2,
            boxShadow: "0 8px 24px rgba(0,0,0,0.10)", mb: 3, overflow: "hidden",
          }}
        >
          <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
              <Typography sx={{ fontSize: { xs: "1.2rem", sm: "1.4rem" }, fontWeight: 800, color: "#111827", flex: 1, mr: 1 }}>
                {arena.nome}
              </Typography>
              <Typography sx={{ color: "#16a34a", fontWeight: 800, fontSize: "1rem", whiteSpace: "nowrap" }}>
                R$ {Number(arena.preco).toFixed(2).replace(".", ",")}/h
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <StarIcon sx={{ color: "#f59e0b", fontSize: 18 }} />
              <Typography sx={{ color: "#6b7280", fontSize: "0.88rem" }}>
                {arena.rating} · 120 avaliações
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
              <LocationOnOutlinedIcon sx={{ color: "#16a34a", fontSize: 17, mr: 0.5 }} />
              <Typography sx={{ color: "#6b7280", fontSize: "0.88rem" }}>Fortaleza - CE</Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {(Array.isArray(arena.esportes) ? arena.esportes : [arena.esportes]).map((esp) => (
                <Box
                  key={esp}
                  sx={{
                    px: 1.5, py: 0.4, borderRadius: "99px",
                    backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0",
                    fontSize: "0.78rem", fontWeight: 600, color: "#166534",
                  }}
                >
                  {esp}
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Horários */}
        <Typography sx={{ fontWeight: 700, fontSize: "1rem", color: "#111827", mb: 1.5 }}>
          Horários disponíveis
        </Typography>

        {horariosMock.map((h, index) => {
          const isSelected = selectedHora === h.hora;
          const isDisponivel = h.status === "Disponível";
          return (
            <Card
              key={index}
              onClick={() => isDisponivel && setSelectedHora(h.hora)}
              sx={{
                mb: 1.5, borderRadius: 3,
                cursor: isDisponivel ? "pointer" : "not-allowed",
                border: isSelected ? "2px solid #16a34a" : "1px solid #e5e7eb",
                backgroundColor: !isDisponivel ? "#f9fafb" : isSelected ? "#f0fdf4" : "#fff",
                boxShadow: "none",
                transition: "all 0.15s",
                opacity: isDisponivel ? 1 : 0.6,
              }}
            >
              <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: "14px !important", px: 2 }}>
                <Box>
                  <Typography sx={{ fontWeight: 700, color: "#111827", fontSize: "0.95rem" }}>
                    {h.hora}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: isDisponivel ? "#16a34a" : "#9ca3af", fontWeight: 600 }}>
                    {h.status}
                  </Typography>
                </Box>
                {h.preco && (
                  <Typography sx={{ fontWeight: 700, color: "#111827", fontSize: "0.9rem" }}>
                    R$ {Number(h.preco).toFixed(2).replace(".", ",")}
                  </Typography>
                )}
              </CardContent>
            </Card>
          );
        })}

        {/* Comentários */}
        <Typography sx={{ fontWeight: 700, fontSize: "1rem", color: "#111827", mt: 3, mb: 1.5 }}>
          Comentários
        </Typography>

        {comentariosMock.map((c, index) => (
          <Card key={index} sx={{ borderRadius: 3, boxShadow: "none", border: "1px solid #f3f4f6", mb: 1.5 }}>
            <CardContent sx={{ p: "16px !important" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                <Avatar sx={{ width: 36, height: 36, backgroundColor: "#16a34a", fontSize: "0.8rem", fontWeight: 700 }}>
                  {getInitials(c.usuario)}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ fontWeight: 700, fontSize: "0.88rem", color: "#111827" }}>
                      {c.usuario}
                    </Typography>
                    <Typography sx={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                      {c.tempo}
                    </Typography>
                  </Box>
                  <RatingStars value={c.rating} />
                </Box>
              </Box>
              <Typography sx={{ color: "#6b7280", fontSize: "0.85rem", lineHeight: 1.5 }}>
                {c.texto}
              </Typography>
            </CardContent>
          </Card>
        ))}

        <Box sx={{ height: 80 }} />
      </Container>

      {/* Botão fixo */}
      {selectedHora && (
        <Box
          sx={{
            position: "fixed", left: 0, right: 0,
            bottom: { xs: 72, sm: 68 },
            px: { xs: 2, sm: 3 }, zIndex: 10,
          }}
        >
          <Container maxWidth="sm">
            <Button
              fullWidth variant="contained" onClick={handleContinuar}
              sx={{
                height: 52, borderRadius: "14px",
                backgroundColor: "#16a34a",
                textTransform: "none", fontWeight: 700, fontSize: "1rem",
                boxShadow: "0 6px 20px rgba(22,163,74,0.35)",
                "&:hover": { backgroundColor: "#15803d" },
              }}
            >
              Continuar · {selectedHora}
            </Button>
          </Container>
        </Box>
      )}
    </Box>
  );
}