import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Typography,
  Button,
  Box,
  IconButton,
  InputAdornment
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  validateName,
  validateEmail,
  validatePhone,
  validateStrongPassword,
  formatPhone,
  sanitizeEmail
} from "../utils/validators";

export default function Register({ onRegister }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: ""
  });

  const [touched, setTouched] = useState({
    nome: false,
    email: false,
    telefone: false,
    senha: false
  });

  const [showPassword, setShowPassword] = useState(false);

  const errors = useMemo(() => {
    return {
      nome: touched.nome ? validateName(form.nome) : "",
      email: touched.email ? validateEmail(form.email) : "",
      telefone: touched.telefone ? validatePhone(form.telefone) : "",
      senha: touched.senha ? validateStrongPassword(form.senha) : ""
    };
  }, [form, touched]);

  const hasErrors = Boolean(
    errors.nome || errors.email || errors.telefone || errors.senha
  );

  const handleChange = (field, value) => {
    let nextValue = value;

    if (field === "telefone") {
      nextValue = formatPhone(value);
    }

    if (field === "email") {
      nextValue = value.trimStart();
    }

    setForm((prev) => ({
      ...prev,
      [field]: nextValue
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
      nome: true,
      email: true,
      telefone: true,
      senha: true
    };

    setTouched(nextTouched);

    return {
      nome: validateName(form.nome),
      email: validateEmail(form.email),
      telefone: validatePhone(form.telefone),
      senha: validateStrongPassword(form.senha)
    };
  };

  const handleRegister = () => {
    const submitErrors = validateBeforeSubmit();

    if (
      submitErrors.nome ||
      submitErrors.email ||
      submitErrors.telefone ||
      submitErrors.senha
    ) {
      return;
    }

    const payload = {
      nome: form.nome.trim(),
      email: sanitizeEmail(form.email),
      telefone: form.telefone,
      senha: form.senha
    };

    console.log("Cadastro payload pronto para backend:", payload);

    onRegister();
    navigate("/buscar");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}
      >
        Criar conta
      </Typography>

      <TextField
        label="Nome"
        fullWidth
        value={form.nome}
        onChange={(e) => handleChange("nome", e.target.value)}
        onBlur={() => handleBlur("nome")}
        error={Boolean(errors.nome)}
        helperText={errors.nome || " "}
        autoComplete="name"
        sx={{ mb: 1 }}
      />

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
        label="Telefone"
        fullWidth
        value={form.telefone}
        onChange={(e) => handleChange("telefone", e.target.value)}
        onBlur={() => handleBlur("telefone")}
        error={Boolean(errors.telefone)}
        helperText={errors.telefone || " "}
        autoComplete="tel"
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
        helperText={
          errors.senha ||
          "Use 8+ caracteres, 1 maiúscula, 1 número e 1 caractere especial"
        }
        autoComplete="new-password"
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
        fullWidth
        onClick={handleRegister}
        disabled={
          !form.nome || !form.email || !form.telefone || !form.senha || hasErrors
        }
      >
        Criar conta
      </Button>

      <Box sx={{ mt: 2 }}>
        <Button fullWidth onClick={() => navigate("/")}>
          Já tenho conta
        </Button>
      </Box>
    </Container>
  );
}