import React, { useMemo, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  Chip,
  Divider,
  InputAdornment
} from "@mui/material";
import StadiumOutlinedIcon from "@mui/icons-material/StadiumOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";

const reservasMock = [
  {
    id: 1,
    cliente: "Gabriel Batista",
    data: "Hoje",
    horario: "18:00 - 19:00",
    valor: 120,
    status: "Pago"
  },
  {
    id: 2,
    cliente: "Diego Sousa",
    data: "Hoje",
    horario: "20:00 - 21:00",
    valor: 100,
    status: "Pendente"
  },
  {
    id: 3,
    cliente: "Pedro Lima",
    data: "Amanhã",
    horario: "19:00 - 20:00",
    valor: 120,
    status: "Confirmado"
  }
];

const horariosIniciais = [
  { hora: "17:00", status: "Livre", preco: 100 },
  { hora: "18:00", status: "Reservado", preco: 120 },
  { hora: "19:00", status: "Livre", preco: 120 },
  { hora: "20:00", status: "Manutenção", preco: 0 },
  { hora: "21:00", status: "Livre", preco: 130 }
];

export default function UserArena() {
  const [nome, setNome] = useState("Arena do Bairro");
  const [localidade, setLocalidade] = useState("Fortaleza - CE");
  const [endereco, setEndereco] = useState("Rua das Quadras, 123");
  const [promocao, setPromocao] = useState("Terça do Futevôlei - 20% OFF");
  const [novoHorario, setNovoHorario] = useState("");
  const [horarios, setHorarios] = useState(horariosIniciais);

  const reservasHoje = useMemo(
    () => reservasMock.filter((r) => r.data === "Hoje").length,
    []
  );

  const horariosLivres = useMemo(
    () => horarios.filter((h) => h.status === "Livre").length,
    [horarios]
  );

  const faturamentoHoje = useMemo(
    () =>
      reservasMock
        .filter((r) => r.data === "Hoje" && r.status === "Pago")
        .reduce((acc, item) => acc + item.valor, 0),
    []
  );

  const promocoesAtivas = promocao.trim() ? 1 : 0;

  const handleAddHorario = () => {
    const valor = novoHorario.trim();
    if (!valor) return;

    const jaExiste = horarios.some((h) => h.hora === valor);
    if (jaExiste) {
      setNovoHorario("");
      return;
    }

    setHorarios((prev) => [
      ...prev,
      { hora: valor, status: "Livre", preco: 120 }
    ]);
    setNovoHorario("");
  };

  const handleTrocarStatus = (hora) => {
    setHorarios((prev) =>
      prev.map((item) => {
        if (item.hora !== hora) return item;

        const proximoStatus =
          item.status === "Livre"
            ? "Reservado"
            : item.status === "Reservado"
            ? "Manutenção"
            : "Livre";

        return { ...item, status: proximoStatus };
      })
    );
  };

  const handleSalvar = () => {
    alert("Dados da arena salvos com sucesso!");
  };

  const getStatusColor = (status) => {
    if (status === "Livre") return "#2f8f46";
    if (status === "Reservado") return "#d32f2f";
    if (status === "Manutenção") return "#f59e0b";
    return "#777";
  };

  const getReservaChipColor = (status) => {
    if (status === "Pago") return "success";
    if (status === "Pendente") return "warning";
    return "info";
  };

  const inputStyle = {
    mb: 2,
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
      backgroundColor: "#f8f8f8",
      height: { xs: 52, sm: 56 }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        pb: 10
      }}
    >
      {/* TOPO */}
      <Box
        sx={{
          background: "linear-gradient(180deg, #246b35 0%, #2f8f46 100%)",
          color: "#fff",
          px: { xs: 2, sm: 3 },
          pt: { xs: 3, sm: 4 },
          pb: { xs: 4, sm: 5 },
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5
        }}
      >
        <Container maxWidth="md" sx={{ px: "0 !important" }}>
          <Typography
            sx={{
              fontSize: { xs: "1.35rem", sm: "1.8rem" },
              fontWeight: 700,
              mb: 0.5
            }}
          >
            Painel do Proprietário
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "0.92rem", sm: "1rem" },
              color: "rgba(255,255,255,0.92)"
            }}
          >
            Gerencie sua arena, horários, reservas e faturamento.
          </Typography>
        </Container>
      </Box>

      <Container
        maxWidth="md"
        sx={{
          mt: -3,
          px: { xs: 2, sm: 3 }
        }}
      >
        {/* CARD PRINCIPAL */}
        <Card
          sx={{
            borderRadius: 5,
            overflow: "hidden",
            boxShadow: "0 10px 24px rgba(0,0,0,0.10)",
            mb: 2
          }}
        >
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80"
            alt="Arena"
            sx={{
              width: "100%",
              height: { xs: 180, sm: 240 },
              objectFit: "cover"
            }}
          />

          <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                mb: 2
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1.2rem", sm: "1.5rem" },
                    color: "#2d2d2d"
                  }}
                >
                  {nome}
                </Typography>

                <Typography sx={{ color: "#666", mt: 0.5 }}>
                  {localidade}
                </Typography>

                <Typography sx={{ color: "#2f8f46", mt: 0.8, fontWeight: 700 }}>
                  Aberta hoje até 23h
                </Typography>
              </Box>

              <Button
                variant="contained"
                startIcon={<EditOutlinedIcon />}
                sx={{
                  backgroundColor: "#2f8f46",
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 700,
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#246b35",
                    boxShadow: "none"
                  }
                }}
              >
                Editar Arena
              </Button>
            </Box>

            {/* RESUMO */}
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: "none",
                    border: "1px solid #ececec"
                  }}
                >
                  <CardContent>
                    <CalendarMonthOutlinedIcon sx={{ color: "#2f8f46", mb: 1 }} />
                    <Typography sx={{ color: "#777", fontSize: "0.85rem" }}>
                      Reservas hoje
                    </Typography>
                    <Typography sx={{ fontWeight: 700, fontSize: "1.4rem" }}>
                      {reservasHoje}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={6} sm={3}>
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: "none",
                    border: "1px solid #ececec"
                  }}
                >
                  <CardContent>
                    <AccessTimeOutlinedIcon sx={{ color: "#2f8f46", mb: 1 }} />
                    <Typography sx={{ color: "#777", fontSize: "0.85rem" }}>
                      Horários livres
                    </Typography>
                    <Typography sx={{ fontWeight: 700, fontSize: "1.4rem" }}>
                      {horariosLivres}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={6} sm={3}>
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: "none",
                    border: "1px solid #ececec"
                  }}
                >
                  <CardContent>
                    <AttachMoneyOutlinedIcon sx={{ color: "#2f8f46", mb: 1 }} />
                    <Typography sx={{ color: "#777", fontSize: "0.85rem" }}>
                      Faturamento
                    </Typography>
                    <Typography sx={{ fontWeight: 700, fontSize: "1.2rem" }}>
                      R$ {faturamentoHoje}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={6} sm={3}>
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: "none",
                    border: "1px solid #ececec"
                  }}
                >
                  <CardContent>
                    <LocalOfferOutlinedIcon sx={{ color: "#2f8f46", mb: 1 }} />
                    <Typography sx={{ color: "#777", fontSize: "0.85rem" }}>
                      Promoções
                    </Typography>
                    <Typography sx={{ fontWeight: 700, fontSize: "1.4rem" }}>
                      {promocoesAtivas}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Grid container spacing={2}>
          {/* AGENDA */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: 5,
                boxShadow: "none",
                border: "1px solid #ececec",
                height: "100%"
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                <Typography sx={{ fontWeight: 700, fontSize: "1.1rem", mb: 2 }}>
                  Agenda da Arena
                </Typography>

                <Grid container spacing={1.5} sx={{ mb: 2 }}>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      label="Novo horário"
                      placeholder="Ex: 22:00"
                      fullWidth
                      value={novoHorario}
                      onChange={(e) => setNovoHorario(e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                          backgroundColor: "#f8f8f8",
                          height: { xs: 52, sm: 56 }
                        }
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccessTimeOutlinedIcon sx={{ color: "#2f8f46" }} />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleAddHorario}
                      startIcon={<AddIcon />}
                      sx={{
                        height: { xs: 52, sm: 56 },
                        borderRadius: 3,
                        backgroundColor: "#2f8f46",
                        textTransform: "none",
                        fontWeight: 700,
                        boxShadow: "none",
                        "&:hover": {
                          backgroundColor: "#246b35",
                          boxShadow: "none"
                        }
                      }}
                    >
                      Adicionar
                    </Button>
                  </Grid>
                </Grid>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                  {horarios.map((item) => (
                    <Card
                      key={item.hora}
                      onClick={() => handleTrocarStatus(item.hora)}
                      sx={{
                        borderRadius: 3,
                        boxShadow: "none",
                        border: "1px solid #ececec",
                        cursor: "pointer"
                      }}
                    >
                      <CardContent
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          py: 1.8
                        }}
                      >
                        <Box>
                          <Typography sx={{ fontWeight: 700 }}>
                            {item.hora}
                          </Typography>
                          <Typography
                            sx={{
                              color: getStatusColor(item.status),
                              fontSize: "0.9rem",
                              fontWeight: 600
                            }}
                          >
                            {item.status}
                          </Typography>
                        </Box>

                        <Typography sx={{ fontWeight: 700 }}>
                          {item.preco ? `R$ ${item.preco}` : "-"}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* RESERVAS */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: 5,
                boxShadow: "none",
                border: "1px solid #ececec",
                height: "100%"
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                <Typography sx={{ fontWeight: 700, fontSize: "1.1rem", mb: 2 }}>
                  Reservas Recebidas
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  {reservasMock.map((reserva) => (
                    <Card
                      key={reserva.id}
                      sx={{
                        borderRadius: 4,
                        boxShadow: "none",
                        border: "1px solid #ececec"
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            gap: 1
                          }}
                        >
                          <Box>
                            <Typography sx={{ fontWeight: 700 }}>
                              {reserva.cliente}
                            </Typography>
                            <Typography sx={{ color: "#666", fontSize: "0.9rem" }}>
                              {reserva.data} • {reserva.horario}
                            </Typography>
                            <Typography
                              sx={{
                                color: "#2f8f46",
                                fontWeight: 700,
                                mt: 0.8
                              }}
                            >
                              R$ {reserva.valor}
                            </Typography>
                          </Box>

                          <Chip
                            label={reserva.status}
                            color={getReservaChipColor(reserva.status)}
                            size="small"
                          />
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            mt: 2,
                            flexWrap: "wrap"
                          }}
                        >
                          <Button
                            size="small"
                            variant="contained"
                            sx={{
                              backgroundColor: "#2f8f46",
                              textTransform: "none",
                              fontWeight: 700,
                              boxShadow: "none",
                              "&:hover": {
                                backgroundColor: "#246b35",
                                boxShadow: "none"
                              }
                            }}
                          >
                            Confirmar
                          </Button>

                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            sx={{ textTransform: "none", fontWeight: 700 }}
                          >
                            Cancelar
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* CADASTRO DA ARENA */}
          <Grid item xs={12}>
            <Card
              sx={{
                borderRadius: 5,
                boxShadow: "none",
                border: "1px solid #ececec"
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                <Typography sx={{ fontWeight: 700, fontSize: "1.1rem", mb: 2 }}>
                  Minha Arena
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Nome da Arena"
                      fullWidth
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      sx={inputStyle}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <StadiumOutlinedIcon sx={{ color: "#2f8f46" }} />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Localidade"
                      fullWidth
                      value={localidade}
                      onChange={(e) => setLocalidade(e.target.value)}
                      sx={inputStyle}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOnOutlinedIcon sx={{ color: "#2f8f46" }} />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Endereço"
                      fullWidth
                      value={endereco}
                      onChange={(e) => setEndereco(e.target.value)}
                      sx={inputStyle}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <HomeWorkOutlinedIcon sx={{ color: "#2f8f46" }} />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Promoção"
                      fullWidth
                      value={promocao}
                      onChange={(e) => setPromocao(e.target.value)}
                      sx={inputStyle}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocalOfferOutlinedIcon sx={{ color: "#2f8f46" }} />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2.5 }} />

                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSalvar}
                  sx={{
                    height: 52,
                    borderRadius: 3,
                    backgroundColor: "#2f8f46",
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "1rem",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "#246b35",
                      boxShadow: "none"
                    }
                  }}
                >
                  Salvar Alterações
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* FINANCEIRO */}
          <Grid item xs={12}>
            <Card
              sx={{
                borderRadius: 5,
                boxShadow: "none",
                border: "1px solid #ececec"
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                <Typography sx={{ fontWeight: 700, fontSize: "1.1rem", mb: 2 }}>
                  Financeiro Básico
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Card
                      sx={{
                        borderRadius: 4,
                        boxShadow: "none",
                        border: "1px solid #ececec"
                      }}
                    >
                      <CardContent>
                        <Typography sx={{ color: "#777", fontSize: "0.85rem" }}>
                          Recebido hoje
                        </Typography>
                        <Typography sx={{ fontWeight: 700, fontSize: "1.3rem" }}>
                          R$ {faturamentoHoje}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Card
                      sx={{
                        borderRadius: 4,
                        boxShadow: "none",
                        border: "1px solid #ececec"
                      }}
                    >
                      <CardContent>
                        <Typography sx={{ color: "#777", fontSize: "0.85rem" }}>
                          Pendentes
                        </Typography>
                        <Typography sx={{ fontWeight: 700, fontSize: "1.3rem" }}>
                          {
                            reservasMock.filter((r) => r.status === "Pendente")
                              .length
                          }
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Card
                      sx={{
                        borderRadius: 4,
                        boxShadow: "none",
                        border: "1px solid #ececec"
                      }}
                    >
                      <CardContent>
                        <Typography sx={{ color: "#777", fontSize: "0.85rem" }}>
                          Reservas pagas
                        </Typography>
                        <Typography sx={{ fontWeight: 700, fontSize: "1.3rem" }}>
                          {reservasMock.filter((r) => r.status === "Pago").length}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}