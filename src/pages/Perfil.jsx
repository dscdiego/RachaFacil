import React from "react";
import { Container, Typography, TextField, Button } from "@mui/material";

export default function Perfil() {
  return (
    <Container style={{ marginTop: "30px" }}>
      <Typography variant="h4">Perfil do Usuário</Typography>

      <TextField
        label="Nome"
        fullWidth
        margin="normal"
        defaultValue="Beatriz"
      />

      <TextField
        label="Email"
        fullWidth
        margin="normal"
        defaultValue="beatriz@email.com"
      />

      <TextField
        label="Senha"
        type="password"
        fullWidth
        margin="normal"
        defaultValue="********"
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: "20px" }}
      >
        Salvar alterações
      </Button>
    </Container>
  );
}
