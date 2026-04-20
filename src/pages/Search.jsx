import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Chip
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";

const arenasMock = [
  {
    id: 1,
    nome: "Arena Beach Fortaleza",
    rating: 4.8,
    esportes: ["Beach Tennis", "Futevôlei"],
    preco: 70,
    imagem:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 2,
    nome: "Arena Fut7",
    rating: 4.7,
    esportes: ["Campo Society", "Fut7"],
    preco: 100,
    imagem:
      "https://images.unsplash.com/photo-1508098682722-e99c643e7485?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 3,
    nome: "Quadra PraiaSport",
    rating: 4.6,
    esportes: ["Vôlei de Praia", "Futevôlei"],
    preco: 60,
    imagem:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80"
  }
];

const categorias = [
  "Todos",
  "Beach Tennis",
  "Fut7",
  "Futevôlei",
  "Vôlei de Praia",
  "Campo Society"
];

export default function Search() {
  const navigate = useNavigate();

  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");

  const arenasFiltradas = useMemo(() => {
    return arenasMock.filter((arena) => {
      const texto = busca.toLowerCase();

      const bateBusca =
        arena.nome.toLowerCase().includes(texto) ||
        arena.esportes.some((esporte) =>
          esporte.toLowerCase().includes(texto)
        );

      const bateCategoria =
        categoriaAtiva === "Todos" ||
        arena.esportes.includes(categoriaAtiva);

      return bateBusca && bateCategoria;
    });
  }, [busca, categoriaAtiva]);

  const handleOpenArena = (arena) => {
    navigate("/arena", {
      state: arena
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        pb: 10
      }}
    >
      {/* TOPO */}
      <Box
        sx={{
          background: "linear-gradient(180deg, #246b35 0%, #2f8f46 100%)",
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          px: { xs: 2, sm: 3 },
          pt: { xs: 3, sm: 4 },
          pb: { xs: 3, sm: 4 },
          color: "#fff"
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "1.3rem", sm: "1.6rem" },
            fontWeight: 700,
            mb: 1
          }}
        >
          Encontre sua arena
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            color: "rgba(255,255,255,0.9)"
          }}
        >
          <LocationOnOutlinedIcon sx={{ fontSize: 18, mr: 0.5 }} />
          <Typography sx={{ fontSize: "0.95rem" }}>
            Fortaleza - CE
          </Typography>
        </Box>

        <TextField
          fullWidth
          placeholder="Buscar arenas ou esportes"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#fff",
              borderRadius: "30px",
              height: { xs: 50, sm: 54 },
              px: 1
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#7d7d7d" }} />
              </InputAdornment>
            )
          }}
        />
      </Box>

      {/* CATEGORIAS */}
      <Box
        sx={{
          display: "flex",
          gap: 1.2,
          overflowX: "auto",
          px: 2,
          py: 2,
          "&::-webkit-scrollbar": {
            display: "none"
          }
        }}
      >
        {categorias.map((categoria) => (
          <Chip
            key={categoria}
            label={categoria}
            onClick={() => setCategoriaAtiva(categoria)}
            sx={{
              backgroundColor:
                categoriaAtiva === categoria ? "#2f8f46" : "#fff",
              color: categoriaAtiva === categoria ? "#fff" : "#444",
              border:
                categoriaAtiva === categoria
                  ? "1px solid #2f8f46"
                  : "1px solid #e6e6e6",
              borderRadius: "14px",
              px: 1,
              height: 42,
              fontWeight: 600,
              boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
              flexShrink: 0
            }}
          />
        ))}
      </Box>

      {/* LISTA */}
      <Box sx={{ px: { xs: 2, sm: 2 } }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1rem", sm: "1.1rem" },
            mb: 2,
            color: "#2d2d2d"
          }}
        >
          Arenas próximas
        </Typography>

        {arenasFiltradas.length === 0 ? (
          <Typography sx={{ color: "#777", mt: 3 }}>
            Nenhuma arena encontrada.
          </Typography>
        ) : (
          arenasFiltradas.map((arena) => (
            <Card
              key={arena.id}
              onClick={() => handleOpenArena(arena)}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                mb: 2,
                borderRadius: 4,
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                transition: "0.2s",
                "&:hover": {
                  transform: "translateY(-2px)"
                }
              }}
            >
              <Box
                component="img"
                src={arena.imagem}
                alt={arena.nome}
                sx={{
                  width: { xs: "100%", sm: 120 },
                  height: { xs: 180, sm: 120 },
                  objectFit: "cover"
                }}
              />

              <CardContent
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  py: 1.8
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: "0.95rem", sm: "1rem" },
                      color: "#2d2d2d"
                    }}
                  >
                    {arena.nome}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: 0.7,
                      mb: 0.7
                    }}
                  >
                    <StarIcon
                      sx={{
                        color: "#fbbc04",
                        fontSize: 18,
                        mr: 0.5
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: { xs: "0.85rem", sm: "0.9rem" },
                        color: "#666"
                      }}
                    >
                      {arena.rating} · {arena.esportes.join(" · ")}
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  sx={{
                    color: "#2f8f46",
                    fontWeight: 700,
                    fontSize: { xs: "0.9rem", sm: "0.95rem" }
                  }}
                >
                  A partir de R$ {arena.preco}/h
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </Box>
  );
}