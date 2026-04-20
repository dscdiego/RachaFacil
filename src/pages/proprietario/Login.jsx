import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Divider,
  IconButton,
  InputAdornment
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  sanitizeEmail,
  validateEmail,
  validateLoginPassword
} from "../../utils/validators";

export default function LoginProprietario({ onLoginProprietario }) {
  const [form, setForm] = useState({
    email: "",
    senha: ""
  });

  const [touched, setTouched] = useState({
    email: false,
    senha: false
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const errors = useMemo(() => {
    return {
      email: touched.email ? validateEmail(form.email) : "",
      senha: touched.senha ? validateLoginPassword(form.senha) : ""
    };
  }, [form, touched]);

  const hasErrors = Boolean(errors.email || errors.senha);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: field === "email" ? value.trimStart() : value
    }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true
    }));
  };

  const validateBeforeSubmit = () => {
    const nextTouched = {
      email: true,
      senha: true
    };

    setTouched(nextTouched);

    return {
      email: validateEmail(form.email),
      senha: validateLoginPassword(form.senha)
    };
  };

  const handleLogin = () => {
    const submitErrors = validateBeforeSubmit();

    if (submitErrors.email || submitErrors.senha) {
      return;
    }

    const payload = {
      email: sanitizeEmail(form.email),
      senha: form.senha
    };

    console.log("Login proprietário pronto para backend:", payload);

    onLoginProprietario();
    navigate("/proprietario/dashboard");
  };

  const handleVoltarLoginUsuario = () => {
    localStorage.removeItem("authUser");
    localStorage.removeItem("authProprietario");
    navigate("/");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", mb: 1, textAlign: "center" }}
      >
        Área do Proprietário
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: "text.secondary", mb: 4, textAlign: "center" }}
      >
        Acesse sua conta para gerenciar suas arenas
      </Typography>

      <TextField
        label="E-mail"
        fullWidth
        value={form.email}
        onChange={(e) => handleChange("email", e.target.value)}
        onBlur={() => handleBlur("email")}
        error={Boolean(errors.email)}
        helperText={errors.email || " "}
        autoComplete="email"
        sx={{ mb: 1 }}
      />

      <TextField
        label="Senha"
        type={showPassword ? "text" : "password"}
        fullWidth
        value={form.senha}
        onChange={(e) => handleChange("senha", e.target.value)}
        onBlur={() => handleBlur("senha")}
        error={Boolean(errors.senha)}
        helperText={errors.senha || " "}
        autoComplete="current-password"
        sx={{ mb: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
        disabled={!form.email || !form.senha || hasErrors}
      >
        Entrar como proprietário
      </Button>

      <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
        <Divider sx={{ flex: 1 }} />
        <Typography sx={{ mx: 2, color: "text.secondary" }}>
          ou
        </Typography>
        <Divider sx={{ flex: 1 }} />
      </Box>

      <Button
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        onClick={handleVoltarLoginUsuario}
      >
        Voltar para login do usuário
      </Button>

      <Button
        variant="outlined"
        fullWidth
        onClick={() => navigate("/cadastro-arena")}
      >
        Quero cadastrar minha arena
      </Button>
    </Container>
  );
}