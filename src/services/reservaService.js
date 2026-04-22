import api from "../api/axios";

const reservaService = {
  // Usuário
  criar: async ({ arenaId, horarioId, data, formaPagamento, cupom }) => {
    const { data: reserva } = await api.post("/reservas", {
      arenaId,
      horarioId,
      data,
      formaPagamento,
      cupom: cupom || null,
    });
    return reserva;
  },

  minhasReservas: async () => {
    const { data } = await api.get("/reservas");
    return data;
  },

  confirmarPagamento: async (reservaId) => {
    const { data } = await api.patch(`/reservas/${reservaId}/confirmar`);
    return data;
  },

  cancelar: async (reservaId) => {
    const { data } = await api.patch(`/reservas/${reservaId}/cancelar`);
    return data;
  },

  // Proprietário
  reservasProprietario: async () => {
    const { data } = await api.get("/reservas/proprietario");
    return data;
  },
};

export default reservaService;
