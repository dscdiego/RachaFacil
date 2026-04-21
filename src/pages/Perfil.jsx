import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container, Typography, TextField, Button,
  Box, Avatar, Card, CardContent, Divider, Snackbar, Alert
} from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

export default function Perfil({ onLogout }) {
  const navigate = useNavigate();
  const [editando, setEditando] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  const [form, setForm] = useState({
    nome: "Diego Sousa",
    email: "diego@email.com",
    telefone: "(85) 99999-1234",
  });

  const handleSalvar = () => {
    console.log("Salvar perfil:", form);
    setEditando(false);
    setSnackbar(true);
  };

  const handleSair = () => {
    if (onLogout) onLogout();
    navigate("/");
  };

  const fieldStyle = {
    mb: 1.5,
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      backgroundColor: editando ? "#fff" : "#f9fafb",
    },
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 3, pb: 12, px: { xs: 2, sm: 3 } }}>
      <Typography sx={{ fontWeight: 800, fontSize: "1.4rem", color: "#111827", mb: 3 }}>
        Meu Perfil
      </Typography>

      {/* Card do avatar */}
      <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", mb: 2 }}>
        <CardContent
          sx={{
            display: "flex", flexDirection: "column",
            alignItems: "center", py: 3, px: 2,
          }}
        >
          <Box sx={{ position: "relative", mb: 2 }}>
            <Avatar
              sx={{
                width: 80, height: 80,
                backgroundColor: "#16a34a", fontSize: "2rem",
              }}
            >
              <PersonRoundedIcon sx={{ fontSize: 44 }} />
            </Avatar>
            <Box
              sx={{
                position: "absolute", bottom: 0, right: 0,
                width: 26, height: 26, borderRadius: "50%",
                backgroundColor: "#fff", border: "2px solid #f5f7f9",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <EditRoundedIcon sx={{ fontSize: 14, color: "#6b7280" }} />
            </Box>
          </Box>

          <Typography sx={{ fontWeight: 800, fontSize: "1rem", color: "#111827" }}>
            {form.nome}
          </Typography>
          <Typography sx={{ fontSize: "0.82rem", color: "#9ca3af", mt: 0.5 }}>
            {form.email}
          </Typography>

          <Divider sx={{ width: "100%", my: 2 }} />

          {/* Estatísticas */}
          <Box sx={{ display: "flex", gap: 4 }}>
            {[{ label: "Reservas", valor: "12" }, { label: "Arenas", valor: "5" }].map((s) => (
              <Box key={s.label} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontWeight: 800, fontSize: "1.2rem", color: "#111827" }}>
                  {s.valor}
                </Typography>
                <Typography sx={{ fontSize: "0.75rem", color: "#9ca3af" }}>{s.label}</Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Formulário de dados */}
      <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", mb: 2 }}>
        <CardContent sx={{ p: "20px !important" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#111827" }}>
              Dados pessoais
            </Typography>
            {!editando && (
              <Button
                size="small" startIcon={<EditRoundedIcon sx={{ fontSize: "15px !important" }} />}
                onClick={() => setEditando(true)}
                sx={{
                  borderRadius: "10px", textTransform: "none",
                  fontWeight: 700, fontSize: "0.8rem",
                  color: "#16a34a",
                }}
              >
                Editar
              </Button>
            )}
          </Box>

          <TextField
            label="Nome completo" fullWidth
            value={form.nome}
            onChange={(e) => setForm((p) => ({ ...p, nome: e.target.value }))}
            disabled={!editando}
            sx={fieldStyle}
          />
          <TextField
            label="E-mail" fullWidth
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            disabled={!editando}
            sx={fieldStyle}
          />
          <TextField
            label="Telefone" fullWidth
            value={form.telefone}
            onChange={(e) => setForm((p) => ({ ...p, telefone: e.target.value }))}
            disabled={!editando}
            sx={{ ...fieldStyle, mb: editando ? 1.5 : 0 }}
          />

          {editando && (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="contained" fullWidth
                startIcon={<SaveRoundedIcon />}
                onClick={handleSalvar}
                sx={{
                  borderRadius: "12px", height: 46, textTransform: "none",
                  fontWeight: 700, backgroundColor: "#16a34a",
                  "&:hover": { backgroundColor: "#15803d" },
                }}
              >
                Salvar
              </Button>
              <Button
                variant="outlined" fullWidth
                onClick={() => setEditando(false)}
                sx={{
                  borderRadius: "12px", height: 46, textTransform: "none",
                  fontWeight: 700, borderColor: "#e5e7eb", color: "#6b7280",
                }}
              >
                Cancelar
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Ação: ver reservas */}
      <Box
        onClick={() => navigate("/reservas")}
        sx={{
          display: "flex", alignItems: "center", gap: 2,
          p: 2, borderRadius: "12px", border: "1px solid #f3f4f6",
          cursor: "pointer", mb: 1.5, backgroundColor: "#fff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          "&:hover": { backgroundColor: "#f9fafb", borderColor: "#e5e7eb" },
          transition: "all 0.15s",
        }}
      >
        <Box
          sx={{
            width: 38, height: 38, borderRadius: "10px",
            backgroundColor: "#dbeafe",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <EventAvailableRoundedIcon sx={{ fontSize: 18, color: "#1d4ed8" }} />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: "0.875rem", color: "#111827" }}>
            Minhas Reservas
          </Typography>
          <Typography sx={{ fontSize: "0.78rem", color: "#9ca3af" }}>
            Ver histórico de reservas
          </Typography>
        </Box>
      </Box>

      {/* Sair */}
      <Button
        variant="outlined" color="error" fullWidth
        startIcon={<LogoutRoundedIcon />}
        onClick={handleSair}
        sx={{
          mt: 1, borderRadius: "12px", height: 48,
          textTransform: "none", fontWeight: 700,
        }}
      >
        Sair da conta
      </Button>

      <Snackbar
        open={snackbar} autoHideDuration={2000}
        onClose={() => setSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ fontWeight: 700, borderRadius: "12px" }}>
          Perfil atualizado com sucesso!
        </Alert>
      </Snackbar>
    </Container>
  );
}