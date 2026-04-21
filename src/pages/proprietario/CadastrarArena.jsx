import React, { useState } from "react";
import {
  Grid, Card, CardContent, Typography, Box,
  Button, TextField, Chip, IconButton,
  Divider, Snackbar, Alert
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { useNavigate } from "react-router-dom";
import ProprietarioLayout from "../../components/ProprietarioLayout";

const tiposEsporte = ["Society", "Fut7", "Beach Tennis", "Vôlei de Praia", "Futevôlei", "Basquete"];

const diasSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

export default function CadastrarArena() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    localidade: "",
    logradouro: "",
    promocao: "",
  });

  const [tiposSelecionados, setTiposSelecionados] = useState([]);
  const [diasSelecionados, setDiasSelecionados] = useState([]);
  const [horarios, setHorarios] = useState([{ hora: "", preco: "" }]);
  const [snackbar, setSnackbar] = useState(false);
  const [erros, setErros] = useState({});

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErros((prev) => ({ ...prev, [field]: "" }));
  };

  const toggleTipo = (tipo) => {
    setTiposSelecionados((prev) =>
      prev.includes(tipo) ? prev.filter((t) => t !== tipo) : [...prev, tipo]
    );
  };

  const toggleDia = (dia) => {
    setDiasSelecionados((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
    );
  };

  const addHorario = () => {
    setHorarios((prev) => [...prev, { hora: "", preco: "" }]);
  };

  const removeHorario = (index) => {
    setHorarios((prev) => prev.filter((_, i) => i !== index));
  };

  const updateHorario = (index, field, value) => {
    setHorarios((prev) =>
      prev.map((h, i) => (i === index ? { ...h, [field]: value } : h))
    );
  };

  const validar = () => {
    const novosErros = {};
    if (!form.nome.trim()) novosErros.nome = "Nome é obrigatório";
    if (!form.localidade.trim()) novosErros.localidade = "Localidade é obrigatória";
    if (!form.logradouro.trim()) novosErros.logradouro = "Logradouro é obrigatório";
    if (tiposSelecionados.length === 0) novosErros.tipos = "Selecione ao menos um tipo";
    if (diasSelecionados.length === 0) novosErros.dias = "Selecione ao menos um dia";
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSalvar = () => {
    if (!validar()) return;
    console.log("Payload arena:", { ...form, tipos: tiposSelecionados, dias: diasSelecionados, horarios });
    setSnackbar(true);
    setTimeout(() => navigate("/proprietario/minhas-arenas"), 1800);
  };

  const fieldStyle = {
    "& .MuiOutlinedInput-root": { borderRadius: "12px", backgroundColor: "#fff" },
  };

  return (
    <ProprietarioLayout
      title="Cadastrar Arena"
      subtitle="Preencha os dados da sua nova arena."
    >
      {/* Botão voltar */}
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIosNewRoundedIcon sx={{ fontSize: "14px !important" }} />}
          onClick={() => navigate("/proprietario/minhas-arenas")}
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 700,
            color: "#374151",
            borderColor: "#e5e7eb",
            border: "1px solid #e5e7eb",
            px: 2.5, py: 1,
            "&:hover": { backgroundColor: "#f9fafb", borderColor: "#d1d5db" },
          }}
        >
          Voltar
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Coluna esquerda */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <CardContent sx={{ p: "20px !important" }}>
              <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#111827", mb: 2 }}>
                Informações básicas
              </Typography>

              <TextField
                label="Nome da arena" fullWidth
                value={form.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
                error={Boolean(erros.nome)}
                helperText={erros.nome || " "}
                sx={{ ...fieldStyle, mb: 0.5 }}
              />

              <Grid container spacing={1.5} sx={{ mb: 0.5 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Localidade" fullWidth
                    placeholder="Fortaleza - CE"
                    value={form.localidade}
                    onChange={(e) => handleChange("localidade", e.target.value)}
                    error={Boolean(erros.localidade)}
                    helperText={erros.localidade || " "}
                    sx={fieldStyle}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Logradouro" fullWidth
                    placeholder="R. das Arenas, 123"
                    value={form.logradouro}
                    onChange={(e) => handleChange("logradouro", e.target.value)}
                    error={Boolean(erros.logradouro)}
                    helperText={erros.logradouro || " "}
                    sx={fieldStyle}
                  />
                </Grid>
              </Grid>

              <TextField
                label="Promoção"
                fullWidth
                placeholder="Ex: 10% de desconto em maio"
                value={form.promocao}
                onChange={(e) => handleChange("promocao", e.target.value)}
                helperText=" "
                sx={{ ...fieldStyle, mb: 0.5 }}
              />

              <Divider sx={{ my: 2 }} />

              {/* Tipos de esporte */}
              <Typography sx={{ fontWeight: 700, fontSize: "0.9rem", color: "#111827", mb: 1.5 }}>
                Tipos de esporte
              </Typography>
              {erros.tipos && (
                <Typography sx={{ fontSize: "0.75rem", color: "#ef4444", mb: 1 }}>
                  {erros.tipos}
                </Typography>
              )}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
                {tiposEsporte.map((tipo) => {
                  const ativo = tiposSelecionados.includes(tipo);
                  return (
                    <Chip
                      key={tipo}
                      label={tipo}
                      onClick={() => toggleTipo(tipo)}
                      sx={{
                        fontWeight: 700,
                        fontSize: "0.78rem",
                        backgroundColor: ativo ? "#16a34a" : "#f3f4f6",
                        color: ativo ? "#fff" : "#374151",
                        border: ativo ? "1px solid #16a34a" : "1px solid #e5e7eb",
                        "&:hover": { backgroundColor: ativo ? "#15803d" : "#e5e7eb" },
                      }}
                    />
                  );
                })}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Coluna direita */}
        <Grid item xs={12} md={6}>
          {/* Fotos */}
          <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", mb: 3 }}>
            <CardContent sx={{ p: "20px !important" }}>
              <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#111827", mb: 1.5 }}>
                Fotos da arena
              </Typography>
              <Box
                sx={{
                  border: "2px dashed #e5e7eb",
                  borderRadius: "12px",
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  "&:hover": { borderColor: "#16a34a", backgroundColor: "#f0fdf4" },
                }}
              >
                <AddPhotoAlternateRoundedIcon sx={{ fontSize: 32, color: "#9ca3af" }} />
                <Typography sx={{ fontWeight: 600, fontSize: "0.875rem", color: "#6b7280" }}>
                  Clique para adicionar fotos
                </Typography>
                <Typography sx={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                  JPG, PNG até 10MB cada
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Horários na agenda */}
          <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <CardContent sx={{ p: "20px !important" }}>
              <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#111827", mb: 1.5 }}>
                Horários na agenda
              </Typography>

              {/* Dias da semana */}
              <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap", mb: 2 }}>
                {diasSemana.map((dia) => {
                  const ativo = diasSelecionados.includes(dia);
                  return (
                    <Box
                      key={dia}
                      onClick={() => toggleDia(dia)}
                      sx={{
                        width: 36, height: 36, borderRadius: "10px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", fontWeight: 700, fontSize: "0.75rem",
                        backgroundColor: ativo ? "#16a34a" : "#f3f4f6",
                        color: ativo ? "#fff" : "#374151",
                        border: ativo ? "1px solid #16a34a" : "1px solid #e5e7eb",
                        transition: "all 0.15s",
                        "&:hover": { backgroundColor: ativo ? "#15803d" : "#e5e7eb" },
                      }}
                    >
                      {dia}
                    </Box>
                  );
                })}
              </Box>
              {erros.dias && (
                <Typography sx={{ fontSize: "0.75rem", color: "#ef4444", mb: 1 }}>
                  {erros.dias}
                </Typography>
              )}

              {/* Lista de horários */}
              {horarios.map((h, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}
                >
                  <AccessTimeRoundedIcon sx={{ fontSize: 18, color: "#9ca3af", flexShrink: 0 }} />
                  <TextField
                    placeholder="18:00"
                    value={h.hora}
                    onChange={(e) => updateHorario(index, "hora", e.target.value)}
                    sx={{
                      flex: 1,
                      "& .MuiOutlinedInput-root": { borderRadius: "10px", backgroundColor: "#fff", height: 40 },
                    }}
                  />
                  <TextField
                    placeholder="R$ 120/h"
                    value={h.preco}
                    onChange={(e) => updateHorario(index, "preco", e.target.value)}
                    sx={{
                      flex: 1,
                      "& .MuiOutlinedInput-root": { borderRadius: "10px", backgroundColor: "#fff", height: 40 },
                    }}
                  />
                  {horarios.length > 1 && (
                    <IconButton
                      size="small"
                      onClick={() => removeHorario(index)}
                      sx={{ color: "#ef4444", p: 0.5 }}
                    >
                      <DeleteRoundedIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  )}
                </Box>
              ))}

              <Button
                size="small"
                startIcon={<AddRoundedIcon />}
                onClick={addHorario}
                sx={{
                  mt: 0.5, borderRadius: "10px", textTransform: "none",
                  fontWeight: 700, fontSize: "0.8rem", color: "#16a34a",
                  "&:hover": { backgroundColor: "#f0fdf4" },
                }}
              >
                Adicionar horário
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Botão salvar */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 1.5 }}>
        <Button
          variant="outlined"
          onClick={() => navigate("/proprietario/minhas-arenas")}
          sx={{
            borderRadius: "12px", textTransform: "none", fontWeight: 700,
            borderColor: "#e5e7eb", color: "#374151", px: 3,
            "&:hover": { borderColor: "#d1d5db", backgroundColor: "#f9fafb" },
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleSalvar}
          sx={{
            borderRadius: "12px", textTransform: "none", fontWeight: 700,
            backgroundColor: "#16a34a", px: 4,
            "&:hover": { backgroundColor: "#15803d" },
          }}
        >
          Salvar arena
        </Button>
      </Box>

      <Snackbar
        open={snackbar}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ fontWeight: 700, borderRadius: "12px" }}>
          Arena cadastrada com sucesso! 🎉
        </Alert>
      </Snackbar>
    </ProprietarioLayout>
  );
}