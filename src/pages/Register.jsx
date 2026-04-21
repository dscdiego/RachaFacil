import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField, Typography, Button, Box,
  IconButton, InputAdornment, LinearProgress
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import {
  validateName, validateEmail, validatePhone,
  validateStrongPassword, formatPhone, sanitizeEmail
} from "../utils/validators";

function passwordStrength(senha) {
  let score = 0;
  if (senha.length >= 8) score++;
  if (/[A-Z]/.test(senha)) score++;
  if (/[0-9]/.test(senha)) score++;
  if (/[^A-Za-z0-9]/.test(senha)) score++;
  return score;
}

const strengthLabel = ["", "Fraca", "Regular", "Boa", "Forte"];
const strengthColor = ["", "#ef4444", "#f97316", "#eab308", "#16a34a"];

export default function Register({ onRegister }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", senha: "" });
  const [touched, setTouched] = useState({ nome: false, email: false, telefone: false, senha: false });
  const [showPassword, setShowPassword] = useState(false);

  const errors = useMemo(() => ({
    nome:     touched.nome     ? validateName(form.nome)                 : "",
    email:    touched.email    ? validateEmail(form.email)               : "",
    telefone: touched.telefone ? validatePhone(form.telefone)            : "",
    senha:    touched.senha    ? validateStrongPassword(form.senha)      : "",
  }), [form, touched]);

  const handleChange = (field, value) => {
    let next = value;
    if (field === "telefone") next = formatPhone(value);
    if (field === "email") next = value.trimStart();
    setForm((prev) => ({ ...prev, [field]: next }));
  };

  const handleBlur = (field) => setTouched((prev) => ({ ...prev, [field]: true }));

  const handleRegister = () => {
    setTouched({ nome: true, email: true, telefone: true, senha: true });
    const e = {
      nome: validateName(form.nome), email: validateEmail(form.email),
      telefone: validatePhone(form.telefone), senha: validateStrongPassword(form.senha),
    };
    if (e.nome || e.email || e.telefone || e.senha) return;
    console.log("Cadastro payload:", { nome: form.nome.trim(), email: sanitizeEmail(form.email), telefone: form.telefone });
    onRegister();
    navigate("/buscar");
  };

  const hasRealErrors = Boolean(
    validateName(form.nome) ||
    validateEmail(form.email) ||
    validatePhone(form.telefone) ||
    validateStrongPassword(form.senha)
  );

  const strength = passwordStrength(form.senha);

  const fieldStyle = {
    mb: 1,
    "& .MuiOutlinedInput-root": { borderRadius: "12px", backgroundColor: "#fff" },
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f7f9", display: "flex", flexDirection: "column" }}>
      {/* Header verde */}
      <Box
        sx={{
          background: "linear-gradient(160deg, #166534 0%, #16a34a 60%, #22c55e 100%)",
          px: 2.5, pt: 3, pb: 5, position: "relative",
          display: "flex", alignItems: "center", gap: 1.5,
        }}
      >
        <IconButton onClick={() => navigate("/")} sx={{ color: "#fff", p: 0.5 }}>
          <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SportsSoccerIcon sx={{ fontSize: 22, color: "#fff" }} />
          <Typography sx={{ fontWeight: 800, fontSize: "1.15rem", color: "#fff" }}>
            Criar conta
          </Typography>
        </Box>

        <Box
          sx={{
            position: "absolute", bottom: -1, left: 0, right: 0, height: 32,
            backgroundColor: "#f5f7f9",
            borderTopLeftRadius: "50% 100%", borderTopRightRadius: "50% 100%",
          }}
        />
      </Box>

      {/* Formulário */}
      <Box sx={{ px: { xs: 2.5, sm: 4 }, pt: 2, pb: 4, maxWidth: 440, width: "100%", mx: "auto" }}>
        <TextField
          label="Nome completo" fullWidth value={form.nome}
          onChange={(e) => handleChange("nome", e.target.value)}
          onBlur={() => handleBlur("nome")}
          error={Boolean(errors.nome)} helperText={errors.nome || " "}
          autoComplete="name" sx={fieldStyle}
        />

        <TextField
          label="E-mail" fullWidth value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          error={Boolean(errors.email)} helperText={errors.email || " "}
          autoComplete="email" sx={fieldStyle}
        />

        <TextField
          label="Telefone" fullWidth value={form.telefone}
          onChange={(e) => handleChange("telefone", e.target.value)}
          onBlur={() => handleBlur("telefone")}
          error={Boolean(errors.telefone)} helperText={errors.telefone || " "}
          autoComplete="tel" sx={fieldStyle}
        />

        <TextField
          label="Senha" type={showPassword ? "text" : "password"}
          fullWidth value={form.senha}
          onChange={(e) => handleChange("senha", e.target.value)}
          onBlur={() => handleBlur("senha")}
          error={Boolean(errors.senha)}
          helperText={errors.senha || "8+ caracteres, 1 maiúscula, 1 número e 1 especial"}
          autoComplete="new-password"
          sx={{ ...fieldStyle, mb: form.senha ? 0.5 : 1 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword((p) => !p)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Barra de força da senha */}
        {form.senha.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <LinearProgress
              variant="determinate" value={(strength / 4) * 100}
              sx={{
                height: 4, borderRadius: 2,
                backgroundColor: "#e5e7eb",
                "& .MuiLinearProgress-bar": { backgroundColor: strengthColor[strength], borderRadius: 2 },
              }}
            />
            <Typography sx={{ fontSize: "0.75rem", color: strengthColor[strength], mt: 0.5, fontWeight: 600 }}>
              Senha {strengthLabel[strength]}
            </Typography>
          </Box>
        )}

        <Button
          variant="contained" fullWidth onClick={handleRegister}
          disabled={hasRealErrors}
          sx={{
            borderRadius: "12px", height: 50, textTransform: "none",
            fontWeight: 700, fontSize: "1rem", mt: 1,
            backgroundColor: "#16a34a",
            "&:hover": { backgroundColor: "#15803d" },
            "&.Mui-disabled": { backgroundColor: "#d1d5db" },
          }}
        >
          Criar conta
        </Button>

        <Button
          fullWidth onClick={() => navigate("/")}
          sx={{
            mt: 1.5, borderRadius: "12px", height: 46, textTransform: "none",
            fontWeight: 700, color: "#6b7280",
            "&:hover": { backgroundColor: "#f3f4f6" },
          }}
        >
          Já tenho conta
        </Button>
      </Box>
    </Box>
  );
}