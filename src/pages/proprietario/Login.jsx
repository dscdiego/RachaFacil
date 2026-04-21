import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button, TextField, Typography, Box,
  Divider, IconButton, InputAdornment
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  sanitizeEmail, validateEmail, validateLoginPassword
} from "../../utils/validators";

export default function LoginProprietario({ onLoginProprietario }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", senha: "" });
  const [touched, setTouched] = useState({ email: false, senha: false });
  const [showPassword, setShowPassword] = useState(false);

  const errors = useMemo(() => ({
    email: touched.email ? validateEmail(form.email) : "",
    senha: touched.senha ? validateLoginPassword(form.senha) : "",
  }), [form, touched]);

  const hasErrors = Boolean(errors.email || errors.senha);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: field === "email" ? value.trimStart() : value }));
  };

  const handleBlur = (field) => setTouched((prev) => ({ ...prev, [field]: true }));

  const handleLogin = () => {
    setTouched({ email: true, senha: true });
    const e = { email: validateEmail(form.email), senha: validateLoginPassword(form.senha) };
    if (e.email || e.senha) return;
    console.log("Login proprietário payload:", { email: sanitizeEmail(form.email), senha: form.senha });
    onLoginProprietario();
    navigate("/proprietario/dashboard");
  };

  const fieldStyle = {
    mb: 1,
    "& .MuiOutlinedInput-root": { borderRadius: "12px", backgroundColor: "#fff" },
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Fundo verde */}
      <Box
        sx={{
          background: "linear-gradient(160deg, #14532d 0%, #166534 50%, #16a34a 100%)",
          flex: "0 0 40%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          pb: 5,
        }}
      >
        {/* Botão voltar */}
        <Box
          sx={{
            position: "absolute", top: 16, left: 16,
            display: "flex", alignItems: "center", gap: 0.5,
            cursor: "pointer", color: "rgba(255,255,255,0.85)",
          }}
          onClick={() => { localStorage.removeItem("authUser"); localStorage.removeItem("authProprietario"); navigate("/"); }}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
          <Typography sx={{ fontSize: "0.82rem", fontWeight: 600 }}>Voltar</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <Box
            sx={{
              width: 48, height: 48, borderRadius: "14px",
              backgroundColor: "rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <SportsSoccerIcon sx={{ fontSize: 28, color: "#fff" }} />
          </Box>
          <Typography sx={{ fontWeight: 800, fontSize: "1.8rem", color: "#fff", letterSpacing: "-0.02em" }}>
            RachaFácil
          </Typography>
        </Box>
        <Typography sx={{ color: "rgba(255,255,255,0.75)", fontSize: "0.88rem" }}>
          Área do Proprietário
        </Typography>

        {/* Curva */}
        <Box
          sx={{
            position: "absolute", bottom: -1, left: 0, right: 0, height: 40,
            backgroundColor: "#f5f7f9",
            borderTopLeftRadius: "50% 100%", borderTopRightRadius: "50% 100%",
          }}
        />
      </Box>

      {/* Formulário */}
      <Box
        sx={{
          backgroundColor: "#f5f7f9", flex: 1,
          px: { xs: 2.5, sm: 4 }, pt: 3, pb: 4,
          maxWidth: 440, width: "100%", mx: "auto",
          display: "flex", flexDirection: "column",
        }}
      >
        <Typography sx={{ fontWeight: 800, fontSize: "1.1rem", color: "#111827", mb: 0.5 }}>
          Entrar na sua conta
        </Typography>
        <Typography sx={{ fontSize: "0.85rem", color: "#9ca3af", mb: 2.5 }}>
          Acesse para gerenciar suas arenas
        </Typography>

        <TextField
          label="E-mail" fullWidth value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          error={Boolean(errors.email)} helperText={errors.email || " "}
          autoComplete="email" sx={fieldStyle}
        />

        <TextField
          label="Senha" type={showPassword ? "text" : "password"}
          fullWidth value={form.senha}
          onChange={(e) => handleChange("senha", e.target.value)}
          onBlur={() => handleBlur("senha")}
          error={Boolean(errors.senha)} helperText={errors.senha || " "}
          autoComplete="current-password" sx={{ ...fieldStyle, mb: 2 }}
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

        <Button
          variant="contained" fullWidth onClick={handleLogin}
          disabled={!form.email || !form.senha || hasErrors}
          sx={{
            borderRadius: "12px", height: 50, textTransform: "none",
            fontWeight: 700, fontSize: "1rem",
            backgroundColor: "#16a34a",
            "&:hover": { backgroundColor: "#15803d" },
            "&.Mui-disabled": { backgroundColor: "#d1d5db" },
          }}
        >
          Entrar como proprietário
        </Button>

        <Box sx={{ display: "flex", alignItems: "center", my: 2.5 }}>
          <Divider sx={{ flex: 1 }} />
          <Typography sx={{ mx: 2, color: "#9ca3af", fontSize: "0.85rem" }}>ou</Typography>
          <Divider sx={{ flex: 1 }} />
        </Box>

        <Button
          variant="outlined" fullWidth
          onClick={() => navigate("/proprietario/cadastro")}
          sx={{
            borderRadius: "12px", height: 48, textTransform: "none",
            fontWeight: 700, borderColor: "#d1d5db", color: "#374151",
            "&:hover": { borderColor: "#16a34a", color: "#16a34a", backgroundColor: "#f0fdf4" },
          }}
        >
          Criar conta de proprietário
        </Button>

        <Typography variant="body2" sx={{ mt: 3, color: "#9ca3af", textAlign: "center", fontSize: "0.78rem" }}>
          Ao entrar ou criar uma conta, você concorda com nossos{" "}
          <Box component="span" sx={{ color: "#16a34a", cursor: "pointer" }}>Termos de serviço</Box>.
        </Typography>
      </Box>
    </Box>
  );
}