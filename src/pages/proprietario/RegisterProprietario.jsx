import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField, Typography, Button, Box,
  IconButton, InputAdornment, LinearProgress,
  Alert, CircularProgress
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import {
  cadastrarProprietarioThunk,
  selectAuthLoading, selectAuthErro,
  selectIsLoggedIn, selectIsProprietario,
  limparErro,
} from "../../store/slices/authSlice";
import {
  validateName, validateEmail, validatePhone,
  validateStrongPassword, formatPhone, sanitizeEmail
} from "../../utils/validators";

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

function validateCNPJ(value) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "CNPJ é obrigatório";
  if (digits.length !== 14) return "CNPJ inválido";
  return "";
}

function formatCNPJ(value) {
  return value.replace(/\D/g, "").slice(0, 14)
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

export default function RegisterProprietario() {
  const navigate       = useNavigate();
  const dispatch       = useDispatch();
  const loading        = useSelector(selectAuthLoading);
  const erro           = useSelector(selectAuthErro);
  const isLoggedIn     = useSelector(selectIsLoggedIn);
  const isProprietario = useSelector(selectIsProprietario);

  const [form, setForm] = useState({ nome: "", email: "", telefone: "", cnpj: "", nomeArena: "", senha: "" });
  const [touched, setTouched] = useState({ nome: false, email: false, telefone: false, cnpj: false, nomeArena: false, senha: false });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isLoggedIn && isProprietario) navigate("/proprietario/dashboard", { replace: true });
  }, [isLoggedIn, isProprietario, navigate]);

  useEffect(() => () => dispatch(limparErro()), [dispatch]);

  const errors = useMemo(() => ({
    nome:      touched.nome      ? validateName(form.nome)               : "",
    email:     touched.email     ? validateEmail(form.email)             : "",
    telefone:  touched.telefone  ? validatePhone(form.telefone)          : "",
    cnpj:      touched.cnpj      ? validateCNPJ(form.cnpj)              : "",
    nomeArena: touched.nomeArena ? (form.nomeArena.trim() ? "" : "Nome da arena é obrigatório") : "",
    senha:     touched.senha     ? validateStrongPassword(form.senha)    : "",
  }), [form, touched]);

  const hasRealErrors = Boolean(
    validateName(form.nome) || validateEmail(form.email) ||
    validatePhone(form.telefone) || validateCNPJ(form.cnpj) ||
    !form.nomeArena.trim() || validateStrongPassword(form.senha)
  );

  const handleChange = (field, value) => {
    let next = value;
    if (field === "telefone") next = formatPhone(value);
    if (field === "email")    next = value.trimStart();
    if (field === "cnpj")     next = formatCNPJ(value);
    setForm((prev) => ({ ...prev, [field]: next }));
    dispatch(limparErro());
  };

  const handleBlur = (field) => setTouched((prev) => ({ ...prev, [field]: true }));

  const handleRegister = () => {
    setTouched({ nome: true, email: true, telefone: true, cnpj: true, nomeArena: true, senha: true });
    if (hasRealErrors) return;
    dispatch(cadastrarProprietarioThunk({
      nome: form.nome.trim(),
      email: sanitizeEmail(form.email),
      telefone: form.telefone,
      cnpj: form.cnpj,
      nomeArena: form.nomeArena.trim(),
      senha: form.senha,
    }));
  };

  const strength = passwordStrength(form.senha);

  const fieldStyle = {
    mb: 1,
    "& .MuiOutlinedInput-root": { borderRadius: "12px", backgroundColor: "#fff" },
  };

  const sectionLabel = (txt) => (
    <Typography sx={{ fontWeight: 700, fontSize: "0.78rem", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", mb: 1.5, mt: 1 }}>
      {txt}
    </Typography>
  );

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Box sx={{ background: "linear-gradient(160deg, #14532d 0%, #166534 50%, #16a34a 100%)", px: 2.5, pt: 3, pb: 5, position: "relative", display: "flex", alignItems: "center", gap: 1.5 }}>
        <IconButton onClick={() => navigate("/proprietario")} sx={{ color: "#fff", p: 0.5 }}>
          <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SportsSoccerIcon sx={{ fontSize: 22, color: "#fff" }} />
          <Typography sx={{ fontWeight: 800, fontSize: "1.15rem", color: "#fff" }}>Criar conta de proprietário</Typography>
        </Box>
        <Box sx={{ position: "absolute", bottom: -1, left: 0, right: 0, height: 32, backgroundColor: "#f5f7f9", borderTopLeftRadius: "50% 100%", borderTopRightRadius: "50% 100%" }} />
      </Box>

      <Box sx={{ backgroundColor: "#f5f7f9", flex: 1, px: { xs: 2.5, sm: 4 }, pt: 2.5, pb: 5, maxWidth: 440, width: "100%", mx: "auto" }}>
        {erro && <Alert severity="error" sx={{ mb: 2, borderRadius: "12px" }}>{erro}</Alert>}

        {sectionLabel("Dados pessoais")}
        <TextField label="Nome completo" fullWidth value={form.nome}
          onChange={(e) => handleChange("nome", e.target.value)} onBlur={() => handleBlur("nome")}
          error={Boolean(errors.nome)} helperText={errors.nome || " "}
          autoComplete="name" sx={fieldStyle} />
        <TextField label="E-mail" fullWidth value={form.email}
          onChange={(e) => handleChange("email", e.target.value)} onBlur={() => handleBlur("email")}
          error={Boolean(errors.email)} helperText={errors.email || " "}
          autoComplete="email" sx={fieldStyle} />
        <TextField label="Telefone" fullWidth value={form.telefone}
          onChange={(e) => handleChange("telefone", e.target.value)} onBlur={() => handleBlur("telefone")}
          error={Boolean(errors.telefone)} helperText={errors.telefone || " "}
          autoComplete="tel" sx={fieldStyle} />

        {sectionLabel("Dados do negócio")}
        <TextField label="CNPJ" fullWidth value={form.cnpj}
          onChange={(e) => handleChange("cnpj", e.target.value)} onBlur={() => handleBlur("cnpj")}
          error={Boolean(errors.cnpj)} helperText={errors.cnpj || " "}
          placeholder="00.000.000/0000-00" sx={fieldStyle} />
        <TextField label="Nome da arena / estabelecimento" fullWidth value={form.nomeArena}
          onChange={(e) => handleChange("nomeArena", e.target.value)} onBlur={() => handleBlur("nomeArena")}
          error={Boolean(errors.nomeArena)} helperText={errors.nomeArena || " "} sx={fieldStyle} />

        {sectionLabel("Segurança")}
        <TextField label="Senha" type={showPassword ? "text" : "password"}
          fullWidth value={form.senha}
          onChange={(e) => handleChange("senha", e.target.value)} onBlur={() => handleBlur("senha")}
          error={Boolean(errors.senha)}
          helperText={errors.senha || "8+ caracteres, 1 maiúscula, 1 número e 1 especial"}
          autoComplete="new-password"
          sx={{ ...fieldStyle, mb: form.senha ? 0.5 : 1 }}
          InputProps={{ endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={() => setShowPassword((p) => !p)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )}} />

        {form.senha.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <LinearProgress variant="determinate" value={(strength / 4) * 100}
              sx={{ height: 4, borderRadius: 2, backgroundColor: "#e5e7eb", "& .MuiLinearProgress-bar": { backgroundColor: strengthColor[strength], borderRadius: 2 } }} />
            <Typography sx={{ fontSize: "0.75rem", color: strengthColor[strength], mt: 0.5, fontWeight: 600 }}>
              Senha {strengthLabel[strength]}
            </Typography>
          </Box>
        )}

        <Button variant="contained" fullWidth onClick={handleRegister}
          disabled={hasRealErrors || loading}
          sx={{ borderRadius: "12px", height: 50, textTransform: "none", fontWeight: 700, fontSize: "1rem", mt: 1, backgroundColor: "#16a34a", "&:hover": { backgroundColor: "#15803d" }, "&.Mui-disabled": { backgroundColor: "#d1d5db" } }}>
          {loading ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : "Criar conta"}
        </Button>

        <Button fullWidth onClick={() => navigate("/proprietario")}
          sx={{ mt: 1.5, borderRadius: "12px", height: 46, textTransform: "none", fontWeight: 700, color: "#6b7280", "&:hover": { backgroundColor: "#f3f4f6" } }}>
          Já tenho conta
        </Button>
      </Box>
    </Box>
  );
}
