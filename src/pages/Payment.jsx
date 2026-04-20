import React, { useMemo, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PersonOutlineIcon from "@mui/icons-material/AccountCircleOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PixIcon from "@mui/icons-material/Pix";
import GoogleIcon from "@mui/icons-material/Google";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const reserva = location.state || {
    id: 1,
    arena: "Arena Society",
    horario: "18:00 - 19:00",
    data: "Hoje",
    status: "Pendente",
    valor: 120
  };

  const [formaPagamento, setFormaPagamento] = useState("cartao");
  const [cupom, setCupom] = useState("");

  const valorBase = Number(reserva.valor) || 120;

  const desconto = useMemo(() => {
    const codigo = cupom.trim().toUpperCase();

    if (codigo === "RACHA10") return valorBase * 0.1;
    if (codigo === "ARENA20") return valorBase * 0.2;

    return 0;
  }, [cupom, valorBase]);

  const valorTotal = Math.max(valorBase - desconto, 0);

  const handleConfirmarPagamento = () => {
    const reservasSalvas = JSON.parse(localStorage.getItem("reservas")) || [];

    const reservasAtualizadas = reservasSalvas.map((item) =>
      item.id === reserva.id
        ? { ...item, status: "Confirmada" }
        : item
    );

    localStorage.setItem("reservas", JSON.stringify(reservasAtualizadas));

    alert(`Pagamento via ${formaPagamento} confirmado com sucesso!`);
    navigate("/reservas");
  };

  const paymentCardStyle = (value) => ({
    border:
      formaPagamento === value
        ? "2px solid #2f8f46"
        : "1px solid #e6e6e6",
    borderRadius: 3,
    boxShadow: "none",
    mb: 1.5,
    overflow: "hidden"
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #1f5f30 0%, #2f8f46 24%, #f5f5f5 24%, #f5f5f5 100%)",
        pb: 12
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          pt: { xs: 2, sm: 2.5 },
          px: { xs: 2, sm: 3 }
        }}
      >
        {/* TOPO */}
        <Box
          sx={{
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3
          }}
        >
          <Button
            onClick={() => navigate(-1)}
            sx={{
              minWidth: 0,
              color: "#fff",
              p: 0.5
            }}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
          </Button>

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.15rem", sm: "1.35rem" },
              letterSpacing: 0.3
            }}
          >
            Pagamento
          </Typography>

          <PersonOutlineIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
        </Box>

        {/* RESUMO */}
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: "0 8px 22px rgba(0,0,0,0.10)",
            mb: 3
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 1.5
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=900&q=80"
                alt={reserva.arena}
                sx={{
                  width: { xs: "100%", sm: 92 },
                  height: { xs: 160, sm: 72 },
                  objectFit: "cover",
                  borderRadius: 2
                }}
              />

              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1rem", sm: "1.15rem" },
                    color: "#2d2d2d"
                  }}
                >
                  {reserva.arena}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "#7a7a7a",
                    mt: 0.3,
                    fontSize: { xs: "0.85rem", sm: "0.9rem" }
                  }}
                >
                  ⭐ 4.7 · 120 avaliações
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "#7a7a7a",
                    mt: 0.4,
                    fontSize: { xs: "0.85rem", sm: "0.9rem" }
                  }}
                >
                  🕒 {reserva.horario}
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                  color: "#2d2d2d",
                  alignSelf: { xs: "flex-start", sm: "center" }
                }}
              >
                R$ {valorBase.toFixed(2).replace(".", ",")}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* FORMA DE PAGAMENTO */}
        <Typography
          sx={{
            fontWeight: 700,
            color: "#2f2f2f",
            fontSize: { xs: "1rem", sm: "1.05rem" },
            mb: 1.2
          }}
        >
          Forma de Pagamento
        </Typography>

        <RadioGroup
          value={formaPagamento}
          onChange={(e) => setFormaPagamento(e.target.value)}
        >
          <Card sx={paymentCardStyle("cartao")}>
            <CardContent sx={{ py: 1.2, px: 1.5 }}>
              <FormControlLabel
                value="cartao"
                control={<Radio sx={{ color: "#2f8f46" }} />}
                sx={{ m: 0, width: "100%" }}
                label={
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.2
                    }}
                  >
                    <CheckCircleIcon
                      sx={{
                        color:
                          formaPagamento === "cartao" ? "#2f8f46" : "#bdbdbd",
                        fontSize: 20
                      }}
                    />
                    <CreditCardIcon sx={{ color: "#1a73e8" }} />
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          color: "#333",
                          fontSize: { xs: "0.9rem", sm: "1rem" }
                        }}
                      >
                        **** 1234
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: "0.75rem", sm: "0.82rem" },
                          color: "#7a7a7a"
                        }}
                      >
                        Cartão de crédito
                      </Typography>
                    </Box>
                  </Box>
                }
              />
            </CardContent>
          </Card>

          <Card sx={paymentCardStyle("pix")}>
            <CardContent sx={{ py: 1.2, px: 1.5 }}>
              <FormControlLabel
                value="pix"
                control={<Radio sx={{ color: "#2f8f46" }} />}
                sx={{ m: 0, width: "100%" }}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                    <PixIcon sx={{ color: "#32bcad" }} />
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: "#333",
                        fontSize: { xs: "0.9rem", sm: "1rem" }
                      }}
                    >
                      Pix
                    </Typography>
                  </Box>
                }
              />
            </CardContent>
          </Card>

          <Card sx={paymentCardStyle("googlepay")}>
            <CardContent sx={{ py: 1.2, px: 1.5 }}>
              <FormControlLabel
                value="googlepay"
                control={<Radio sx={{ color: "#2f8f46" }} />}
                sx={{ m: 0, width: "100%" }}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                    <GoogleIcon sx={{ color: "#ea4335" }} />
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: "#333",
                        fontSize: { xs: "0.9rem", sm: "1rem" }
                      }}
                    >
                      Google Pay
                    </Typography>
                  </Box>
                }
              />
            </CardContent>
          </Card>
        </RadioGroup>

        {/* TOTAL */}
        <Box
          sx={{
            mt: 2.5,
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1rem", sm: "1.05rem" },
              color: "#2f2f2f"
            }}
          >
            Total
          </Typography>

          <Typography
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.15rem", sm: "1.35rem" },
              color: "#2f8f46"
            }}
          >
            R$ {valorTotal.toFixed(2).replace(".", ",")}
          </Typography>
        </Box>

        {/* BOTÃO */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleConfirmarPagamento}
          sx={{
            height: { xs: 46, sm: 48 },
            mb: 3,
            borderRadius: 3,
            backgroundColor: "#2f8f46",
            textTransform: "none",
            fontWeight: 700,
            fontSize: { xs: "0.95rem", sm: "1rem" },
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#246b35",
              boxShadow: "none"
            }
          }}
        >
          Confirmar pagamento
        </Button>

        {/* CUPOM */}
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { xs: "0.95rem", sm: "1rem" },
            color: "#2f2f2f",
            mb: 1
          }}
        >
          Cupom de Desconto{" "}
          <Box component="span" sx={{ color: "#8d8d8d", fontWeight: 400 }}>
            (opcional)
          </Box>
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1.2,
            mb: 2
          }}
        >
          <TextField
            placeholder="Digite seu cupom"
            fullWidth
            value={cupom}
            onChange={(e) => setCupom(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                backgroundColor: "#fff",
                height: { xs: 46, sm: 48 }
              }
            }}
          />

          <Button
            variant="contained"
            sx={{
              minWidth: { xs: "100%", sm: 116 },
              height: { xs: 46, sm: 48 },
              borderRadius: 3,
              backgroundColor: "#e8f4eb",
              color: "#2f8f46",
              textTransform: "none",
              fontWeight: 700,
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#d9ecde",
                boxShadow: "none"
              }
            }}
          >
            Adicionar
          </Button>
        </Box>
      </Container>
    </Box>
  );
}