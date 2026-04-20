import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Container
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import StarIcon from "@mui/icons-material/Star";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const horariosMock = [
  { hora: "17:00", status: "Ocupado", preco: null },
  { hora: "18:00", status: "Disponível", preco: 120 },
  { hora: "19:00", status: "Ocupado", preco: null },
  { hora: "20:00", status: "Disponível", preco: 100 }
];

const comentariosMock = [
  {
    usuario: "Pedro Silva",
    texto: "Ótima quadra! O espaço é excelente e o atendimento também."
  },
  {
    usuario: "Ana Costa",
    texto: "Lugar top! Recomendo demais!"
  }
];

export default function ArenaDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedHora, setSelectedHora] = useState(null);

  const arena = location.state || {
    id: 1,
    nome: "Arena Society",
    rating: 4.7,
    esportes: ["Futebol Society", "Fut7"],
    preco: 120,
    imagem:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80"
  };

  const handleContinuar = () => {
    if (!selectedHora) return;

    const precoHorario =
      horariosMock.find((h) => h.hora === selectedHora)?.preco || arena.preco;

    const novaReserva = {
      id: Date.now(),
      arena: arena.nome,
      horario: `${selectedHora} - 1h`,
      data: "Hoje",
      status: "Pendente",
      valor: precoHorario
    };

    const reservasSalvas =
      JSON.parse(localStorage.getItem("reservas")) || [];

    const jaExiste = reservasSalvas.some(
      (r) =>
        r.arena === novaReserva.arena &&
        r.horario === novaReserva.horario &&
        r.data === novaReserva.data
    );

    if (!jaExiste) {
      localStorage.setItem(
        "reservas",
        JSON.stringify([novaReserva, ...reservasSalvas])
      );
    }

    navigate("/reservas");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        pb: 14
      }}
    >
      {/* IMAGEM TOPO */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: 220, sm: 260, md: 320 }
        }}
      >
        <Box
          component="img"
          src={arena.imagem}
          alt={arena.nome}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block"
          }}
        />

        <Button
          onClick={() => navigate(-1)}
          sx={{
            position: "absolute",
            top: { xs: 16, sm: 20 },
            left: { xs: 16, sm: 20 },
            minWidth: 0,
            width: 42,
            height: 42,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.92)",
            color: "#2d2d2d",
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            "&:hover": {
              backgroundColor: "#fff"
            }
          }}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
        </Button>
      </Box>

      <Container
        maxWidth="sm"
        sx={{
          px: { xs: 2, sm: 3 }
        }}
      >
        {/* CARD PRINCIPAL */}
        <Card
          sx={{
            mt: { xs: -3, sm: -4 },
            borderRadius: { xs: 4, sm: 5 },
            position: "relative",
            zIndex: 2,
            boxShadow: "0 8px 20px rgba(0,0,0,0.10)",
            mb: 3,
            overflow: "hidden"
          }}
        >
          <CardContent
            sx={{
              p: { xs: 2.5, sm: 3 }
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
                fontWeight: 700,
                color: "#2d2d2d"
              }}
            >
              {arena.nome}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 1,
                mb: 1,
                flexWrap: "wrap"
              }}
            >
              <StarIcon
                sx={{
                  color: "#fbbc04",
                  fontSize: 20,
                  mr: 0.5
                }}
              />

              <Typography
                sx={{
                  color: "#666",
                  fontSize: { xs: "0.9rem", sm: "0.95rem" }
                }}
              >
                {arena.rating} · 120 avaliações
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2
              }}
            >
              <LocationOnOutlinedIcon
                sx={{
                  color: "#2f8f46",
                  fontSize: 18,
                  mr: 0.5
                }}
              />

              <Typography
                sx={{
                  color: "#666",
                  fontSize: { xs: "0.9rem", sm: "0.95rem" }
                }}
              >
                Fortaleza - CE
              </Typography>
            </Box>

            <Typography
              sx={{
                color: "#555",
                fontSize: { xs: "0.9rem", sm: "0.95rem" },
                mb: 2,
                lineHeight: 1.5
              }}
            >
              {Array.isArray(arena.esportes)
                ? arena.esportes.join(" · ")
                : arena.esportes}
            </Typography>

            <Typography
              sx={{
                color: "#2f8f46",
                fontWeight: 700,
                fontSize: { xs: "0.95rem", sm: "1rem" }
              }}
            >
              A partir de R$ {Number(arena.preco).toFixed(2).replace(".", ",")}/h
            </Typography>
          </CardContent>
        </Card>

        {/* HORÁRIOS */}
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1rem", sm: "1.1rem" },
            color: "#2d2d2d",
            mb: 2
          }}
        >
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
                mb: 1.5,
                borderRadius: 4,
                cursor: isDisponivel ? "pointer" : "default",
                border: isSelected
                  ? "2px solid #2f8f46"
                  : "1px solid #e6e6e6",
                backgroundColor: !isDisponivel
                  ? "#f1f1f1"
                  : isSelected
                  ? "#e9f8ec"
                  : "#fff",
                boxShadow: "none",
                transition: "0.2s"
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 2
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "#2d2d2d",
                      fontSize: { xs: "0.95rem", sm: "1rem" }
                    }}
                  >
                    {h.hora}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: { xs: "0.85rem", sm: "0.9rem" },
                      color: isDisponivel ? "#2f8f46" : "#999"
                    }}
                  >
                    {h.status}
                  </Typography>
                </Box>

                {h.preco && (
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "#2d2d2d",
                      fontSize: { xs: "0.9rem", sm: "1rem" }
                    }}
                  >
                    R$ {Number(h.preco).toFixed(2).replace(".", ",")}
                  </Typography>
                )}
              </CardContent>
            </Card>
          );
        })}

        {/* COMENTÁRIOS */}
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1rem", sm: "1.1rem" },
            color: "#2d2d2d",
            mt: 4,
            mb: 2
          }}
        >
          Comentários
        </Typography>

        {comentariosMock.map((comentario, index) => (
          <Card
            key={index}
            sx={{
              borderRadius: 4,
              boxShadow: "none",
              border: "1px solid #ececec",
              mb: 1.5
            }}
          >
            <CardContent>
              <Typography
                sx={{
                  fontWeight: 700,
                  color: "#2d2d2d",
                  mb: 0.5,
                  fontSize: { xs: "0.95rem", sm: "1rem" }
                }}
              >
                {comentario.usuario}
              </Typography>

              <Typography
                sx={{
                  color: "#666",
                  fontSize: { xs: "0.9rem", sm: "0.95rem" },
                  lineHeight: 1.5
                }}
              >
                {comentario.texto}
              </Typography>
            </CardContent>
          </Card>
        ))}

        <Box sx={{ height: 80 }} />
      </Container>

      {/* BOTÃO FIXO */}
      {selectedHora && (
        <Box
          sx={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: { xs: 72, sm: 68 },
            px: { xs: 1.5, sm: 2 },
            zIndex: 10
          }}
        >
          <Container maxWidth="sm">
            <Button
              fullWidth
              variant="contained"
              onClick={handleContinuar}
              sx={{
                height: { xs: 50, sm: 54 },
                borderRadius: 4,
                backgroundColor: "#2f8f46",
                textTransform: "none",
                fontWeight: 700,
                fontSize: { xs: "0.95rem", sm: "1rem" },
                boxShadow: "0 6px 18px rgba(47,143,70,0.30)",
                "&:hover": {
                  backgroundColor: "#246b35"
                }
              }}
            >
              Continuar • {selectedHora}
            </Button>
          </Container>
        </Box>
      )}
    </Box>
  );
}