import React, { useEffect, useState } from "react";
import {
  Container, Typography, Card, CardContent,
  Button, Box, Chip, Dialog, DialogTitle,
  DialogContent, DialogContentText, DialogActions
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";

const reservasPadrao = [
  { id: 1, arena: "Arena Society",       horario: "18:00 - 19:00", data: "Hoje",   status: "Pendente",   valor: 120 },
  { id: 2, arena: "Arena Beach Fortaleza", horario: "20:00 - 21:00", data: "Amanhã", status: "Confirmada", valor: 90  },
];

const statusStyles = {
  Confirmada: { bg: "#dcfce7", color: "#166534" },
  Pendente:   { bg: "#fef3c7", color: "#92400e" },
  Cancelada:  { bg: "#fee2e2", color: "#991b1b" },
};

export default function Reservas() {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [cancelando, setCancelando] = useState(null);

  useEffect(() => {
    const salvas = JSON.parse(localStorage.getItem("reservas"));
    setReservas(salvas?.length ? salvas : reservasPadrao);
  }, []);

  const salvar = (novas) => {
    setReservas(novas);
    localStorage.setItem("reservas", JSON.stringify(novas));
  };

  const confirmarCancelamento = () => {
    salvar(reservas.filter((r) => r.id !== cancelando));
    setCancelando(null);
  };

  // Agrupa por data
  const grupos = reservas.reduce((acc, r) => {
    const chave = r.data || "Sem data";
    if (!acc[chave]) acc[chave] = [];
    acc[chave].push(r);
    return acc;
  }, {});

  return (
    <Container maxWidth="sm" sx={{ pt: 3, pb: 12, px: { xs: 2, sm: 3 } }}>
      <Typography sx={{ fontWeight: 800, fontSize: "1.4rem", color: "#111827", mb: 3 }}>
        Minhas Reservas
      </Typography>

      {reservas.length === 0 ? (
        <Box
          sx={{
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            py: 10, gap: 2,
          }}
        >
          <Box
            sx={{
              width: 64, height: 64, borderRadius: "50%",
              backgroundColor: "#f3f4f6",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <EventAvailableRoundedIcon sx={{ fontSize: 30, color: "#9ca3af" }} />
          </Box>
          <Typography sx={{ fontWeight: 700, color: "#374151" }}>
            Nenhuma reserva ainda
          </Typography>
          <Typography sx={{ color: "#9ca3af", fontSize: "0.85rem", textAlign: "center" }}>
            Busque uma arena e faça sua primeira reserva!
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/buscar")}
            sx={{
              mt: 1, borderRadius: "12px", textTransform: "none",
              fontWeight: 700, backgroundColor: "#16a34a",
              "&:hover": { backgroundColor: "#15803d" },
            }}
          >
            Buscar arenas
          </Button>
        </Box>
      ) : (
        Object.entries(grupos).map(([data, items]) => (
          <Box key={data} sx={{ mb: 3 }}>
            {/* Cabeçalho do grupo */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
              <CalendarTodayRoundedIcon sx={{ fontSize: 15, color: "#9ca3af" }} />
              <Typography sx={{ fontWeight: 700, fontSize: "0.82rem", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {data}
              </Typography>
            </Box>

            {items.map((r, i) => (
              <React.Fragment key={r.id}>
                <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", mb: 1.5 }}>
                  <CardContent sx={{ p: "16px !important" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                      <Typography sx={{ fontWeight: 800, fontSize: "0.95rem", color: "#111827" }}>
                        {r.arena}
                      </Typography>
                      <Chip
                        label={r.status}
                        size="small"
                        sx={{
                          fontWeight: 700, fontSize: "0.7rem", height: 24,
                          backgroundColor: statusStyles[r.status]?.bg,
                          color: statusStyles[r.status]?.color,
                        }}
                      />
                    </Box>

                    <Typography sx={{ fontSize: "0.82rem", color: "#6b7280", mb: 0.5 }}>
                      🕒 {r.horario}
                    </Typography>
                    <Typography sx={{ fontSize: "0.82rem", color: "#16a34a", fontWeight: 700 }}>
                      R$ {Number(r.valor).toFixed(2).replace(".", ",")}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
                      {r.status === "Pendente" && (
                        <Button
                          variant="contained" size="small"
                          onClick={() => navigate("/pagamento", { state: r })}
                          sx={{
                            borderRadius: "10px", textTransform: "none",
                            fontWeight: 700, fontSize: "0.8rem",
                            backgroundColor: "#16a34a",
                            "&:hover": { backgroundColor: "#15803d" },
                          }}
                        >
                          Pagar agora
                        </Button>
                      )}
                      {r.status !== "Cancelada" && (
                        <Button
                          variant="outlined" color="error" size="small"
                          onClick={() => setCancelando(r.id)}
                          sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 700, fontSize: "0.8rem" }}
                        >
                          Cancelar
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </React.Fragment>
            ))}
          </Box>
        ))
      )}

      {/* Dialog de confirmação de cancelamento */}
      <Dialog
        open={Boolean(cancelando)}
        onClose={() => setCancelando(null)}
        PaperProps={{ sx: { borderRadius: 3, px: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Cancelar reserva?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: "0.9rem" }}>
            Tem certeza que deseja cancelar esta reserva? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pb: 2, px: 3, gap: 1 }}>
          <Button
            onClick={() => setCancelando(null)}
            sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 700, color: "#6b7280" }}
          >
            Voltar
          </Button>
          <Button
            variant="contained" color="error"
            onClick={confirmarCancelamento}
            sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 700 }}
          >
            Sim, cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}