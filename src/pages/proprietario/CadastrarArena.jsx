import React, { useState, useEffect } from "react";
import {
  Grid, Card, CardContent, Typography, Box,
  Button, TextField, Chip, IconButton,
  Divider, CircularProgress, Alert
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cadastrarArenaThunk,
  editarArenaThunk,
  adicionarHorarioThunk,
  selectArenasLoading,
  selectArenasErro,
  limparErro,
} from "../../store/slices/arenaSlice";
import ProprietarioLayout from "../../components/ProprietarioLayout";

const tiposEsporte = ["Society", "Fut7", "Beach Tennis", "Vôlei de Praia", "Futevôlei", "Basquete"];
const diasSemana   = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

export default function CadastrarArena() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const dispatch  = useDispatch();
  const loading   = useSelector(selectArenasLoading);
  const erro      = useSelector(selectArenasErro);

  // Se vier state, é edição
  const arenaEditando = location.state || null;
  const isEdicao      = Boolean(arenaEditando?.id);

  const [form, setForm] = useState({
    nome:       arenaEditando?.nome       || "",
    localidade: arenaEditando?.localidade || "",
    logradouro: arenaEditando?.logradouro || "",
    promocao:   arenaEditando?.promocao   || "",
    precoBase:  arenaEditando?.precoBase  || "",
  });
  const [tiposSelecionados, setTiposSelecionados] = useState(arenaEditando?.esportes || []);
  const [diasSelecionados,  setDiasSelecionados]  = useState([]);
  const [horarios, setHorarios]                   = useState([{ hora: "", preco: "" }]);
  const [erros, setErros]                         = useState({});

  useEffect(() => () => dispatch(limparErro()), [dispatch]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErros((prev) => ({ ...prev, [field]: "" }));
  };

  const toggleTipo = (tipo) => setTiposSelecionados((prev) =>
    prev.includes(tipo) ? prev.filter((t) => t !== tipo) : [...prev, tipo]);

  const toggleDia = (dia) => setDiasSelecionados((prev) =>
    prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]);

  const addHorario    = () => setHorarios((prev) => [...prev, { hora: "", preco: "" }]);
  const removeHorario = (i) => setHorarios((prev) => prev.filter((_, idx) => idx !== i));
  const updateHorario = (i, field, value) =>
    setHorarios((prev) => prev.map((h, idx) => idx === i ? { ...h, [field]: value } : h));

  const validar = () => {
    const novosErros = {};
    if (!form.nome.trim())       novosErros.nome       = "Nome é obrigatório";
    if (!form.localidade.trim()) novosErros.localidade = "Localidade é obrigatória";
    if (!form.logradouro.trim()) novosErros.logradouro = "Logradouro é obrigatório";
    if (!form.precoBase)         novosErros.precoBase  = "Preço é obrigatório";
    if (tiposSelecionados.length === 0) novosErros.tipos = "Selecione ao menos um tipo";
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSalvar = async () => {
    if (!validar()) return;

    const payload = {
      nome:       form.nome,
      localidade: form.localidade,
      logradouro: form.logradouro,
      promocao:   form.promocao || null,
      precoBase:  Number(form.precoBase),
      esportes:   tiposSelecionados,
    };

    let result;
    if (isEdicao) {
      result = await dispatch(editarArenaThunk({ id: arenaEditando.id, ...payload }));
    } else {
      result = await dispatch(cadastrarArenaThunk(payload));
    }

    if ((isEdicao ? editarArenaThunk : cadastrarArenaThunk).fulfilled.match(result)) {
      const arenaId = result.payload.id;

      // Adiciona horários se for cadastro novo e tiver horários preenchidos
      if (!isEdicao) {
        for (const h of horarios.filter((h) => h.hora && h.preco)) {
          await dispatch(adicionarHorarioThunk({
            arenaId,
            hora:  h.hora,
            preco: Number(h.preco),
            dias:  diasSelecionados,
          }));
        }
      }

      navigate("/proprietario/minhas-arenas");
    }
  };

  const fieldStyle = {
    "& .MuiOutlinedInput-root": { borderRadius: "12px", backgroundColor: "#fff" },
  };

  return (
    <ProprietarioLayout
      title={isEdicao ? "Editar Arena" : "Cadastrar Arena"}
      subtitle={isEdicao ? "Atualize os dados da sua arena." : "Preencha os dados da sua nova arena."}>

      <Box sx={{ mb: 3 }}>
        <Button startIcon={<ArrowBackIosNewRoundedIcon sx={{ fontSize: "14px !important" }} />}
          onClick={() => navigate("/proprietario/minhas-arenas")}
          sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 700, color: "#374151", border: "1px solid #e5e7eb", px: 2.5, py: 1, "&:hover": { backgroundColor: "#f9fafb", borderColor: "#d1d5db" } }}>
          Voltar
        </Button>
      </Box>

      {erro && <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>{erro}</Alert>}

      <Grid container spacing={3}>
        {/* Coluna esquerda */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <CardContent sx={{ p: "20px !important" }}>
              <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#111827", mb: 2 }}>Informações básicas</Typography>

              <TextField label="Nome da arena" fullWidth value={form.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
                error={Boolean(erros.nome)} helperText={erros.nome || " "} sx={{ ...fieldStyle, mb: 0.5 }} />

              <Grid container spacing={1.5} sx={{ mb: 0.5 }}>
                <Grid item xs={12} sm={6}>
                  <TextField label="Localidade" fullWidth placeholder="Fortaleza - CE"
                    value={form.localidade} onChange={(e) => handleChange("localidade", e.target.value)}
                    error={Boolean(erros.localidade)} helperText={erros.localidade || " "} sx={fieldStyle} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Logradouro" fullWidth placeholder="R. das Arenas, 123"
                    value={form.logradouro} onChange={(e) => handleChange("logradouro", e.target.value)}
                    error={Boolean(erros.logradouro)} helperText={erros.logradouro || " "} sx={fieldStyle} />
                </Grid>
              </Grid>

              <TextField label="Preço base (R$/h)" fullWidth type="number"
                value={form.precoBase} onChange={(e) => handleChange("precoBase", e.target.value)}
                error={Boolean(erros.precoBase)} helperText={erros.precoBase || " "} sx={{ ...fieldStyle, mb: 0.5 }} />

              <TextField label="Promoção" fullWidth placeholder="Ex: 10% de desconto em maio"
                value={form.promocao} onChange={(e) => handleChange("promocao", e.target.value)}
                helperText=" " sx={{ ...fieldStyle, mb: 0.5 }} />

              <Divider sx={{ my: 2 }} />

              <Typography sx={{ fontWeight: 700, fontSize: "0.9rem", color: "#111827", mb: 1.5 }}>Tipos de esporte</Typography>
              {erros.tipos && <Typography sx={{ fontSize: "0.75rem", color: "#ef4444", mb: 1 }}>{erros.tipos}</Typography>}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {tiposEsporte.map((tipo) => {
                  const ativo = tiposSelecionados.includes(tipo);
                  return (
                    <Chip key={tipo} label={tipo} onClick={() => toggleTipo(tipo)}
                      sx={{ fontWeight: 700, fontSize: "0.78rem", backgroundColor: ativo ? "#16a34a" : "#f3f4f6", color: ativo ? "#fff" : "#374151", border: ativo ? "1px solid #16a34a" : "1px solid #e5e7eb", "&:hover": { backgroundColor: ativo ? "#15803d" : "#e5e7eb" } }} />
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
              <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#111827", mb: 1.5 }}>Fotos da arena</Typography>
              <Box sx={{ border: "2px dashed #e5e7eb", borderRadius: "12px", p: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 1, cursor: "pointer", transition: "all 0.15s", "&:hover": { borderColor: "#16a34a", backgroundColor: "#f0fdf4" } }}>
                <AddPhotoAlternateRoundedIcon sx={{ fontSize: 32, color: "#9ca3af" }} />
                <Typography sx={{ fontWeight: 600, fontSize: "0.875rem", color: "#6b7280" }}>Clique para adicionar fotos</Typography>
                <Typography sx={{ fontSize: "0.75rem", color: "#9ca3af" }}>JPG, PNG até 10MB cada</Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Horários — só no cadastro */}
          {!isEdicao && (
            <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <CardContent sx={{ p: "20px !important" }}>
                <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#111827", mb: 1.5 }}>Horários na agenda</Typography>

                <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap", mb: 2 }}>
                  {diasSemana.map((dia) => {
                    const ativo = diasSelecionados.includes(dia);
                    return (
                      <Box key={dia} onClick={() => toggleDia(dia)}
                        sx={{ width: 36, height: 36, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontWeight: 700, fontSize: "0.75rem", backgroundColor: ativo ? "#16a34a" : "#f3f4f6", color: ativo ? "#fff" : "#374151", border: ativo ? "1px solid #16a34a" : "1px solid #e5e7eb", transition: "all 0.15s", "&:hover": { backgroundColor: ativo ? "#15803d" : "#e5e7eb" } }}>
                        {dia}
                      </Box>
                    );
                  })}
                </Box>

                {horarios.map((h, index) => (
                  <Box key={index} sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
                    <AccessTimeRoundedIcon sx={{ fontSize: 18, color: "#9ca3af", flexShrink: 0 }} />
                    <TextField placeholder="18:00" value={h.hora}
                      onChange={(e) => updateHorario(index, "hora", e.target.value)}
                      sx={{ flex: 1, "& .MuiOutlinedInput-root": { borderRadius: "10px", backgroundColor: "#fff", height: 40 } }} />
                    <TextField placeholder="R$ 120/h" value={h.preco}
                      onChange={(e) => updateHorario(index, "preco", e.target.value)}
                      sx={{ flex: 1, "& .MuiOutlinedInput-root": { borderRadius: "10px", backgroundColor: "#fff", height: 40 } }} />
                    {horarios.length > 1 && (
                      <IconButton size="small" onClick={() => removeHorario(index)} sx={{ color: "#ef4444", p: 0.5 }}>
                        <DeleteRoundedIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    )}
                  </Box>
                ))}

                <Button size="small" startIcon={<AddRoundedIcon />} onClick={addHorario}
                  sx={{ mt: 0.5, borderRadius: "10px", textTransform: "none", fontWeight: 700, fontSize: "0.8rem", color: "#16a34a", "&:hover": { backgroundColor: "#f0fdf4" } }}>
                  Adicionar horário
                </Button>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      {/* Botões */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 1.5 }}>
        <Button variant="outlined" onClick={() => navigate("/proprietario/minhas-arenas")}
          sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 700, borderColor: "#e5e7eb", color: "#374151", px: 3, "&:hover": { borderColor: "#d1d5db", backgroundColor: "#f9fafb" } }}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleSalvar} disabled={loading}
          sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 700, backgroundColor: "#16a34a", px: 4, "&:hover": { backgroundColor: "#15803d" } }}>
          {loading ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : isEdicao ? "Salvar alterações" : "Salvar arena"}
        </Button>
      </Box>
    </ProprietarioLayout>
  );
}
