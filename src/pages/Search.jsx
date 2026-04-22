import React, { useEffect, useMemo, useState } from "react";
import {
  Box, Typography, TextField, InputAdornment,
  Card, CardContent, Chip, CircularProgress
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import StarIcon from "@mui/icons-material/Star";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listarArenasThunk,
  selectArenas,
  selectArenasLoading,
} from "../store/slices/arenaSlice";

const categorias = [
  { label: "Todos",          icon: <SportsSoccerIcon sx={{ fontSize: 16 }} /> },
  { label: "Beach Tennis",   icon: <SportsTennisIcon sx={{ fontSize: 16 }} /> },
  { label: "Fut7",           icon: <SportsSoccerIcon sx={{ fontSize: 16 }} /> },
  { label: "Futevôlei",      icon: <BeachAccessIcon sx={{ fontSize: 16 }} /> },
  { label: "Vôlei de Praia", icon: <SportsVolleyballIcon sx={{ fontSize: 16 }} /> },
  { label: "Campo Society",  icon: <SportsSoccerIcon sx={{ fontSize: 16 }} /> },
];

export default function Search() {
  const navigate  = useNavigate();
  const dispatch  = useDispatch();
  const arenas    = useSelector(selectArenas);
  const loading   = useSelector(selectArenasLoading);

  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");

  // Carrega arenas ao montar
  useEffect(() => { dispatch(listarArenasThunk()); }, [dispatch]);

  // Filtro local por categoria (busca por texto vai para a API)
  useEffect(() => {
    const debounce = setTimeout(() => {
      dispatch(listarArenasThunk(busca));
    }, 400);
    return () => clearTimeout(debounce);
  }, [busca, dispatch]);

  const arenasFiltradas = useMemo(() => {
    if (categoriaAtiva === "Todos") return arenas;
    return arenas.filter((a) => a.esportes?.includes(categoriaAtiva));
  }, [arenas, categoriaAtiva]);

  return (
    <Box sx={{ backgroundColor: "#f5f7f9", minHeight: "100vh", pb: 10 }}>
      {/* Header */}
      <Box sx={{ background: "linear-gradient(160deg, #166534 0%, #16a34a 60%, #22c55e 100%)", px: { xs: 2, sm: 3 }, pt: { xs: 3.5, sm: 4 }, pb: { xs: 4.5, sm: 5 }, color: "#fff", position: "relative" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 0.5, gap: 0.5 }}>
          <LocationOnOutlinedIcon sx={{ fontSize: 18 }} />
          <Typography sx={{ fontSize: "0.88rem", fontWeight: 600 }}>Fortaleza - CE</Typography>
        </Box>
        <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.35rem", sm: "1.6rem" }, mb: 2, letterSpacing: "-0.01em" }}>
          Encontre sua arena
        </Typography>
        <TextField fullWidth placeholder="Buscar arenas ou esportes"
          value={busca} onChange={(e) => setBusca(e.target.value)}
          sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "#fff", borderRadius: "30px", height: { xs: 50, sm: 54 }, px: 1, "& fieldset": { border: "none" } } }}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: "#9ca3af" }} /></InputAdornment> }} />
        <Box sx={{ position: "absolute", bottom: -1, left: 0, right: 0, height: 32, backgroundColor: "#f5f7f9", borderTopLeftRadius: "50% 100%", borderTopRightRadius: "50% 100%" }} />
      </Box>

      {/* Categorias */}
      <Box sx={{ display: "flex", gap: 1, overflowX: "auto", px: 2, py: 2, "&::-webkit-scrollbar": { display: "none" } }}>
        {categorias.map((cat) => {
          const ativa = categoriaAtiva === cat.label;
          return (
            <Chip key={cat.label}
              icon={React.cloneElement(cat.icon, { sx: { fontSize: "16px !important", color: ativa ? "#fff !important" : "#6b7280 !important" } })}
              label={cat.label}
              onClick={() => setCategoriaAtiva(cat.label)}
              sx={{ backgroundColor: ativa ? "#16a34a" : "#fff", color: ativa ? "#fff" : "#374151", border: ativa ? "1px solid #16a34a" : "1px solid #e5e7eb", borderRadius: "14px", height: 38, fontWeight: 600, fontSize: "0.8rem", flexShrink: 0, "& .MuiChip-icon": { ml: 1 }, "&:hover": { backgroundColor: ativa ? "#15803d" : "#f9fafb" } }}
            />
          );
        })}
      </Box>

      {/* Lista */}
      <Box sx={{ px: { xs: 2, sm: 2 } }}>
        <Typography sx={{ fontWeight: 700, fontSize: "1rem", mb: 2, color: "#111827" }}>
          {loading ? "Buscando..." : `${arenasFiltradas.length} arena${arenasFiltradas.length !== 1 ? "s" : ""} próxima${arenasFiltradas.length !== 1 ? "s" : ""}`}
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress sx={{ color: "#16a34a" }} />
          </Box>
        ) : arenasFiltradas.length === 0 ? (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 8, gap: 1.5 }}>
            <Box sx={{ width: 64, height: 64, borderRadius: "50%", backgroundColor: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <SearchOffIcon sx={{ fontSize: 30, color: "#9ca3af" }} />
            </Box>
            <Typography sx={{ fontWeight: 700, color: "#374151" }}>Nenhuma arena encontrada</Typography>
            <Typography sx={{ color: "#9ca3af", fontSize: "0.85rem", textAlign: "center" }}>Tente mudar os filtros ou buscar por outro termo</Typography>
          </Box>
        ) : (
          arenasFiltradas.map((arena) => (
            <Card key={arena.id}
              onClick={() => navigate("/arena", { state: arena })}
              sx={{ display: "flex", mb: 2, borderRadius: 3, overflow: "hidden", cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.07)", transition: "all 0.2s", "&:hover": { transform: "translateY(-2px)", boxShadow: "0 6px 20px rgba(0,0,0,0.10)" } }}>
              <Box component="img" src={arena.fotos?.[0] || "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=900&q=80"} alt={arena.nome} sx={{ width: 110, minHeight: 110, objectFit: "cover", flexShrink: 0 }} />
              <CardContent sx={{ flex: 1, py: 1.5, px: 2, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#111827" }}>{arena.nome}</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 0.5, gap: 0.5 }}>
                    <StarIcon sx={{ color: "#f59e0b", fontSize: 15 }} />
                    <Typography sx={{ fontSize: "0.82rem", color: "#6b7280" }}>
                      {arena.rating?.toFixed(1) || "Novo"} · {arena.esportes?.join(" · ")}
                    </Typography>
                  </Box>
                </Box>
                <Typography sx={{ color: "#16a34a", fontWeight: 700, fontSize: "0.9rem", mt: 1 }}>
                  A partir de R$ {arena.precoBase?.toFixed(2).replace(".", ",")}/h
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </Box>
  );
}
