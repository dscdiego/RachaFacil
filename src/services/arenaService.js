import api from "../api/axios";

const arenaService = {
  // Público
  listar: async (busca = "") => {
    const params = busca ? { busca } : {};
    const { data } = await api.get("/arenas", { params });
    return data;
  },

  buscarPorId: async (id) => {
    const { data } = await api.get(`/arenas/${id}`);
    return data;
  },

  // Proprietário
  minhasArenas: async () => {
    const { data } = await api.get("/proprietario/arenas");
    return data;
  },

  cadastrar: async (arenaData) => {
    const { data } = await api.post("/proprietario/arenas", arenaData);
    return data;
  },

  editar: async (id, arenaData) => {
    const { data } = await api.put(`/proprietario/arenas/${id}`, arenaData);
    return data;
  },

  excluir: async (id) => {
    await api.delete(`/proprietario/arenas/${id}`);
  },

  adicionarHorario: async (arenaId, horarioData) => {
    const { data } = await api.post(
      `/proprietario/arenas/${arenaId}/horarios`,
      horarioData
    );
    return data;
  },

  alterarStatusHorario: async (horarioId, status) => {
    const { data } = await api.patch(
      `/proprietario/horarios/${horarioId}/status`,
      null,
      { params: { status } }
    );
    return data;
  },
};

export default arenaService;
