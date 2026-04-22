import React, { useEffect, useState } from "react";
import {
  Grid, Card, CardContent, CardActions,
  Button, Typography, Box, Chip,
  CircularProgress, Dialog, DialogTitle,
  DialogContent, DialogContentText, DialogActions,
  Snackbar, Alert
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import SportsSoccerRoundedIcon from "@mui/icons-material/SportsSoccerRounded";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  minhasArenasThunk,
  excluirArenaThunk,
  selectMinhasArenas,
  selectArenasLoading,
  selectArenasErro,
  limparErro,
} from "../../store/slices/arenaSlice";
import ProprietarioLayout from "../../components/ProprietarioLayout";

const statusStyles = {
  ATIVA:       { bg: "#dcfce7", color: "#166534", label: "Ativa"       },
  EM_ANALISE:  { bg: "#fef3c7", color: "#92400e", label: "Em análise"  },
  INATIVA:     { bg: "#fee2e2", color: "#991b1b", label: "Inativa"     },
};

export default function MinhasArenas() {
  const navigate  = useNavigate();
  const dispatch  = useDispatch();
  const arenas    = useSelector(selectMinhasArenas);
  const loading   = useSelector(selectArenasLoading);
  const erro      = useSelector(selectArenasErro);

  const [excluindo, setExcluindo] = useState(null);
  const [sucesso, setSucesso]     = useState(false);

  useEffect(() => { dispatch(minhasArenasThunk()); }, [dispatch]);
  useEffect(() => () => dispatch(limparErro()), [dispatch]);

  const confirmarExclusao = async () => {
    const result = await dispatch(excluirArenaThunk(excluindo));
    setExcluindo(null);
    if (excluirArenaThunk.fulfilled.match(result)) setSucesso(true);
  };

  return (
    <ProprietarioLayout title="Minhas Arenas" subtitle="Gerencie suas arenas cadastradas.">
      <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" startIcon={<AddRoundedIcon />}
          onClick={() => navigate("/proprietario/cadastrar-arena")}
          sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 700, backgroundColor: "#16a34a", "&:hover": { backgroundColor: "#15803d" }, px: 3 }}>
          Nova Arena
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress sx={{ color: "#16a34a" }} />
        </Box>
      ) : arenas.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography sx={{ color: "#9ca3af", mb: 2 }}>Você ainda não tem arenas cadastradas.</Typography>
          <Button variant="contained" onClick={() => navigate("/proprietario/cadastrar-arena")}
            sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 700, backgroundColor: "#16a34a", "&:hover": { backgroundColor: "#15803d" } }}>
            Cadastrar primeira arena
          </Button>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {arenas.map((arena) => (
            <Grid item xs={12} sm={6} lg={4} key={arena.id}>
              <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", height: "100%", display: "flex", flexDirection: "column", transition: "box-shadow 0.2s", "&:hover": { boxShadow: "0 6px 20px rgba(0,0,0,0.1)" } }}>
                <Box sx={{ height: 6, backgroundColor: arena.status === "ATIVA" ? "#16a34a" : "#d97706", borderRadius: "12px 12px 0 0" }} />
                <CardContent sx={{ flex: 1, p: "16px !important" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1, mb: 1.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", fontSize: "1rem", lineHeight: 1.3 }}>
                      {arena.nome}
                    </Typography>
                    <Chip label={statusStyles[arena.status]?.label || arena.status} size="small"
                      sx={{ fontWeight: 700, fontSize: "0.7rem", height: 24, backgroundColor: statusStyles[arena.status]?.bg, color: statusStyles[arena.status]?.color }} />
                  </Box>
                  <Typography variant="body2" sx={{ color: "#6b7280", mb: 0.75, fontSize: "0.82rem" }}>
                    {arena.esportes?.join(" · ")}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2, mt: 1.5, flexWrap: "wrap" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <PlaceRoundedIcon sx={{ fontSize: 14, color: "#9ca3af" }} />
                      <Typography sx={{ fontSize: "0.78rem", color: "#6b7280" }}>{arena.localidade}</Typography>
                    </Box>
                  </Box>
                  <Typography sx={{ mt: 2, color: "#16a34a", fontWeight: 800, fontSize: "1.05rem" }}>
                    R$ {Number(arena.precoBase).toFixed(2).replace(".", ",")}/h
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2, pt: 0, gap: 1 }}>
                  <Button variant="contained" size="small"
                    onClick={() => navigate("/proprietario/cadastrar-arena", { state: arena })}
                    sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 700, backgroundColor: "#16a34a", "&:hover": { backgroundColor: "#15803d" }, flex: 1 }}>
                    Editar
                  </Button>
                  <Button variant="outlined" color="error" size="small"
                    onClick={() => setExcluindo(arena.id)}
                    sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 700, flex: 1 }}>
                    Excluir
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Dialog de confirmação */}
      <Dialog open={Boolean(excluindo)} onClose={() => setExcluindo(null)} PaperProps={{ sx: { borderRadius: 3, px: 1 } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>Excluir arena?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: "0.9rem" }}>
            Tem certeza? Todas as reservas vinculadas serão afetadas.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pb: 2, px: 3, gap: 1 }}>
          <Button onClick={() => setExcluindo(null)} sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 700, color: "#6b7280" }}>Cancelar</Button>
          <Button variant="contained" color="error" onClick={confirmarExclusao}
            sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 700 }}>
            Sim, excluir
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={sucesso} autoHideDuration={3000} onClose={() => setSucesso(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity="success" sx={{ fontWeight: 700, borderRadius: "12px" }}>Arena excluída com sucesso!</Alert>
      </Snackbar>
      <Snackbar open={Boolean(erro)} autoHideDuration={3000} onClose={() => dispatch(limparErro())} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity="error" sx={{ fontWeight: 700, borderRadius: "12px" }}>{erro}</Alert>
      </Snackbar>
    </ProprietarioLayout>
  );
}
