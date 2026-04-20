import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Chip
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const reservasPadrao = [
  {
    id: 1,
    arena: "Arena Society",
    horario: "18:00 - 19:00",
    data: "Hoje",
    status: "Pendente",
    valor: 120
  },
  {
    id: 2,
    arena: "Arena Beach Fortaleza",
    horario: "20:00 - 21:00",
    data: "Amanhã",
    status: "Confirmada",
    valor: 90
  }
];

export default function Reservas() {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const reservasSalvas = JSON.parse(localStorage.getItem("reservas"));

    if (reservasSalvas && reservasSalvas.length > 0) {
      setReservas(reservasSalvas);
    } else {
      setReservas(reservasPadrao);
      localStorage.setItem("reservas", JSON.stringify(reservasPadrao));
    }
  }, []);

  const atualizarReservas = (novasReservas) => {
    setReservas(novasReservas);
    localStorage.setItem("reservas", JSON.stringify(novasReservas));
  };

  const handlePagamento = (reserva) => {
    navigate("/pagamento", {
      state: reserva
    });
  };

  const handleCancelar = (id) => {
    const novasReservas = reservas.filter((reserva) => reserva.id !== id);
    atualizarReservas(novasReservas);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 3,
        mb: 10
      }}
    >
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Minhas Reservas
      </Typography>

      {reservas.length === 0 ? (
        <Typography color="text.secondary">
          Você ainda não possui reservas.
        </Typography>
      ) : (
        reservas.map((r) => (
          <Card
            key={r.id}
            sx={{
              mb: 2,
              borderRadius: 3,
              boxShadow: 3
            }}
          >
            <CardContent>
              <Stack spacing={1}>
                <Typography variant="h6" fontWeight="bold">
                  {r.arena}
                </Typography>

                <Typography color="text.secondary">
                  {r.data} • {r.horario}
                </Typography>

                <Typography color="text.secondary">
                  Valor: R$ {Number(r.valor).toFixed(2).replace(".", ",")}
                </Typography>

                <Chip
                  label={r.status}
                  color={r.status === "Confirmada" ? "success" : "warning"}
                  sx={{ width: "fit-content" }}
                />

                <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
                  {r.status === "Pendente" && (
                    <Button
                      variant="contained"
                      onClick={() => handlePagamento(r)}
                    >
                      Pagar
                    </Button>
                  )}

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleCancelar(r.id)}
                  >
                    Cancelar
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
}