import React, { useMemo, useState } from "react";
import {
  Container, Typography, Box, Card, CardContent,
  RadioGroup, FormControlLabel, Radio, TextField,
  Button, Snackbar, Alert
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PixIcon from "@mui/icons-material/Pix";
import GoogleIcon from "@mui/icons-material/Google";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import StarIcon from "@mui/icons-material/Star";

const CUPONS = { RACHA10: 0.1, ARENA20: 0.2 };

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const reserva = location.state || {
    id: 1, arena: "Arena Society", horario: "18:00 - 1h",
    data: "Hoje", status: "Pendente", valor: 120,
  };

  const [formaPagamento, setFormaPagamento] = useState("cartao");
  const [cupom, setCupom] = useState("");
  const [cupomAplicado, setCupomAplicado] = useState(null);
  const [cupomErro, setCupomErro] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  const valorBase = Number(reserva.valor) || 120;

  const desconto = useMemo(() => {
    if (!cupomAplicado) return 0;
    return valorBase * (CUPONS[cupomAplicado] || 0);
  }, [cupomAplicado, valorBase]);

  const valorTotal = Math.max(valorBase - desconto, 0);

  const handleAplicarCupom = () => {
    const codigo = cupom.trim().toUpperCase();
    if (CUPONS[codigo]) {
      setCupomAplicado(codigo);
      setCupomErro(false);
    } else {
      setCupomAplicado(null);
      setCupomErro(true);
    }
  };

  const handleConfirmar = () => {
    const salvas = JSON.parse(localStorage.getItem("reservas")) || [];
    const atualizadas = salvas.map((item) =>
      item.id === reserva.id ? { ...item, status: "Confirmada" } : item
    );
    localStorage.setItem("reservas", JSON.stringify(atualizadas));
    setSnackbar(true);
    setTimeout(() => navigate("/reservas"), 1800);
  };

  const paymentCardSx = (value) => ({
    border: formaPagamento === value ? "2px solid #16a34a" : "1px solid #e5e7eb",
    borderRadius: "12px", boxShadow: "none", mb: 1.5, overflow: "hidden",
    backgroundColor: formaPagamento === value ? "#f0fdf4" : "#fff",
  });

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f7f9", pb: 6 }}>
      {/* Header verde */}
      <Box
        sx={{
          background: "linear-gradient(160deg, #166534 0%, #16a34a 60%, #22c55e 100%)",
          px: { xs: 2, sm: 3 }, pt: 3, pb: 5, position: "relative",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          color: "#fff",
        }}
      >
        <Button
          onClick={() => navigate(-1)}
          sx={{ minWidth: 0, color: "#fff", p: 0.5, "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" } }}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
        </Button>
        <Typography sx={{ fontWeight: 700, fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
          Pagamento
        </Typography>
        <Box sx={{ width: 32 }} />

        <Box
          sx={{
            position: "absolute", bottom: -1, left: 0, right: 0, height: 32,
            backgroundColor: "#f5f7f9",
            borderTopLeftRadius: "50% 100%", borderTopRightRadius: "50% 100%",
          }}
        />
      </Box>

      <Container maxWidth="sm" sx={{ px: { xs: 2, sm: 3 }, pt: 2 }}>
        {/* Resumo da reserva */}
        <Card sx={{ borderRadius: 3, boxShadow: "0 4px 16px rgba(0,0,0,0.08)", mb: 3 }}>
          <CardContent sx={{ p: "16px !important" }}>
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=900&q=80"
                alt={reserva.arena}
                sx={{ width: 80, height: 68, objectFit: "cover", borderRadius: "10px", flexShrink: 0 }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#111827" }}>
                  {reserva.arena}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.3 }}>
                  <StarIcon sx={{ fontSize: 13, color: "#f59e0b" }} />
                  <Typography sx={{ fontSize: "0.78rem", color: "#6b7280" }}>4.7 · 120 avaliações</Typography>
                </Box>
                <Typography sx={{ fontSize: "0.78rem", color: "#6b7280", mt: 0.2 }}>
                  🕒 {reserva.horario}
                </Typography>
              </Box>
              <Typography sx={{ fontWeight: 800, color: "#111827", fontSize: "0.95rem", whiteSpace: "nowrap" }}>
                R$ {valorBase.toFixed(2).replace(".", ",")}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Forma de pagamento */}
        <Typography sx={{ fontWeight: 700, color: "#111827", fontSize: "0.95rem", mb: 1.5 }}>
          Forma de Pagamento
        </Typography>

        <RadioGroup value={formaPagamento} onChange={(e) => setFormaPagamento(e.target.value)}>
          {[
            { value: "cartao",    label: "**** 1234", sub: "Cartão de crédito", icon: <CreditCardIcon sx={{ color: "#1a73e8" }} /> },
            { value: "pix",       label: "Pix",       sub: null,                icon: <PixIcon sx={{ color: "#32bcad" }} /> },
            { value: "googlepay", label: "Google Pay", sub: null,               icon: <GoogleIcon sx={{ color: "#ea4335" }} /> },
          ].map((op) => (
            <Card key={op.value} sx={paymentCardSx(op.value)}>
              <CardContent sx={{ py: "12px !important", px: 1.5 }}>
                <FormControlLabel
                  value={op.value}
                  control={<Radio sx={{ color: "#16a34a", "&.Mui-checked": { color: "#16a34a" } }} />}
                  sx={{ m: 0, width: "100%" }}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                      {op.icon}
                      <Box>
                        <Typography sx={{ fontWeight: 700, color: "#111827", fontSize: "0.9rem" }}>
                          {op.label}
                        </Typography>
                        {op.sub && (
                          <Typography sx={{ fontSize: "0.75rem", color: "#6b7280" }}>{op.sub}</Typography>
                        )}
                      </Box>
                    </Box>
                  }
                />
              </CardContent>
            </Card>
          ))}
        </RadioGroup>

        {/* Cupom */}
        <Typography sx={{ fontWeight: 700, fontSize: "0.9rem", color: "#111827", mb: 1, mt: 1 }}>
          Cupom de Desconto{" "}
          <Box component="span" sx={{ color: "#9ca3af", fontWeight: 400 }}>(opcional)</Box>
        </Typography>

        <Box sx={{ display: "flex", gap: 1, mb: 0.5 }}>
          <TextField
            placeholder="Digite seu cupom"
            fullWidth value={cupom}
            onChange={(e) => { setCupom(e.target.value); setCupomErro(false); setCupomAplicado(null); }}
            error={cupomErro}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", backgroundColor: "#fff", height: 46 } }}
          />
          <Button
            variant="contained"
            onClick={handleAplicarCupom}
            disabled={!cupom.trim()}
            sx={{
              borderRadius: "12px", minWidth: 100, height: 46,
              textTransform: "none", fontWeight: 700, flexShrink: 0,
              backgroundColor: "#16a34a",
              "&:hover": { backgroundColor: "#15803d" },
              "&.Mui-disabled": { backgroundColor: "#d1d5db" },
            }}
          >
            Aplicar
          </Button>
        </Box>

        {/* Feedback do cupom */}
        {cupomAplicado && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1.5 }}>
            <CheckCircleRoundedIcon sx={{ fontSize: 16, color: "#16a34a" }} />
            <Typography sx={{ fontSize: "0.8rem", color: "#16a34a", fontWeight: 600 }}>
              Cupom "{cupomAplicado}" aplicado — {CUPONS[cupomAplicado] * 100}% de desconto!
            </Typography>
          </Box>
        )}
        {cupomErro && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1.5 }}>
            <CancelRoundedIcon sx={{ fontSize: 16, color: "#ef4444" }} />
            <Typography sx={{ fontSize: "0.8rem", color: "#ef4444", fontWeight: 600 }}>
              Cupom inválido ou expirado.
            </Typography>
          </Box>
        )}

        {/* Total */}
        <Card sx={{ borderRadius: 3, boxShadow: "none", border: "1px solid #e5e7eb", mb: 2.5, mt: 1 }}>
          <CardContent sx={{ p: "14px 16px !important" }}>
            {desconto > 0 && (
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.75 }}>
                <Typography sx={{ fontSize: "0.85rem", color: "#6b7280" }}>Desconto</Typography>
                <Typography sx={{ fontSize: "0.85rem", color: "#16a34a", fontWeight: 600 }}>
                  - R$ {desconto.toFixed(2).replace(".", ",")}
                </Typography>
              </Box>
            )}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ fontWeight: 700, color: "#111827" }}>Total</Typography>
              <Typography sx={{ fontWeight: 800, fontSize: "1.25rem", color: "#16a34a" }}>
                R$ {valorTotal.toFixed(2).replace(".", ",")}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Button
          fullWidth variant="contained" onClick={handleConfirmar}
          sx={{
            height: 50, borderRadius: "14px", backgroundColor: "#16a34a",
            textTransform: "none", fontWeight: 700, fontSize: "1rem",
            boxShadow: "0 6px 20px rgba(22,163,74,0.30)",
            "&:hover": { backgroundColor: "#15803d" },
          }}
        >
          Confirmar pagamento
        </Button>

        <Typography sx={{ mt: 2, fontSize: "0.75rem", color: "#9ca3af", textAlign: "center" }}>
          Ao confirmar, você concorda com os{" "}
          <Box component="span" sx={{ color: "#16a34a", cursor: "pointer" }}>Termos de serviço</Box>
          {" "}e a{" "}
          <Box component="span" sx={{ color: "#16a34a", cursor: "pointer" }}>Política de privacidade</Box>.
        </Typography>
      </Container>

      {/* Snackbar de sucesso */}
      <Snackbar
        open={snackbar} autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ fontWeight: 700, borderRadius: "12px" }}>
          Pagamento confirmado com sucesso! 🎉
        </Alert>
      </Snackbar>
    </Box>
  );
}