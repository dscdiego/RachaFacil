import api from "../api/axios";

const authService = {
  // Login unificado (usuário e proprietário usam o mesmo endpoint)
  login: async (email, senha) => {
    const { data } = await api.post("/auth/login", { email, senha });
    return data; // { token, tipo, id, nome, email, tipoUsuario }
  },

  cadastrarUsuario: async ({ nome, email, telefone, senha }) => {
    const { data } = await api.post("/auth/usuario/cadastro", {
      nome,
      email,
      telefone,
      senha,
    });
    return data;
  },

  cadastrarProprietario: async ({ nome, email, telefone, cnpj, nomeArena, senha }) => {
    const { data } = await api.post("/auth/proprietario/cadastro", {
      nome,
      email,
      telefone,
      cnpj,
      nomeArena,
      senha,
    });
    return data;
  },
};

export default authService;
