import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";

// Helpers para persistir no localStorage
const salvarSessao = (authData) => {
  localStorage.setItem("token", authData.token);
  localStorage.setItem("usuario", JSON.stringify({
    id: authData.id,
    nome: authData.nome,
    email: authData.email,
    tipoUsuario: authData.tipoUsuario,
  }));
};

const limparSessao = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
};

const usuarioSalvo = () => {
  try {
    return JSON.parse(localStorage.getItem("usuario")) || null;
  } catch {
    return null;
  }
};

// ── Thunks ────────────────────────────────────────────────────────────────

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, senha }, { rejectWithValue }) => {
    try {
      const data = await authService.login(email, senha);
      salvarSessao(data);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.erro || "E-mail ou senha incorretos"
      );
    }
  }
);

export const cadastrarUsuarioThunk = createAsyncThunk(
  "auth/cadastrarUsuario",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await authService.cadastrarUsuario(payload);
      salvarSessao(data);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.erro || "Erro ao criar conta"
      );
    }
  }
);

export const cadastrarProprietarioThunk = createAsyncThunk(
  "auth/cadastrarProprietario",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await authService.cadastrarProprietario(payload);
      salvarSessao(data);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.erro || "Erro ao criar conta"
      );
    }
  }
);

// ── Slice ─────────────────────────────────────────────────────────────────

const authSlice = createSlice({
  name: "auth",
  initialState: {
    usuario: usuarioSalvo(),
    token: localStorage.getItem("token") || null,
    loading: false,
    erro: null,
  },
  reducers: {
    logout: (state) => {
      limparSessao();
      state.usuario = null;
      state.token = null;
      state.erro = null;
    },
    limparErro: (state) => {
      state.erro = null;
    },
  },
  extraReducers: (builder) => {
    const pendente = (state) => {
      state.loading = true;
      state.erro = null;
    };

    const sucesso = (state, action) => {
      state.loading = false;
      state.usuario = {
        id: action.payload.id,
        nome: action.payload.nome,
        email: action.payload.email,
        tipoUsuario: action.payload.tipoUsuario,
      };
      state.token = action.payload.token;
    };

    const falha = (state, action) => {
      state.loading = false;
      state.erro = action.payload;
    };

    builder
      .addCase(loginThunk.pending, pendente)
      .addCase(loginThunk.fulfilled, sucesso)
      .addCase(loginThunk.rejected, falha)
      .addCase(cadastrarUsuarioThunk.pending, pendente)
      .addCase(cadastrarUsuarioThunk.fulfilled, sucesso)
      .addCase(cadastrarUsuarioThunk.rejected, falha)
      .addCase(cadastrarProprietarioThunk.pending, pendente)
      .addCase(cadastrarProprietarioThunk.fulfilled, sucesso)
      .addCase(cadastrarProprietarioThunk.rejected, falha);
  },
});

export const { logout, limparErro } = authSlice.actions;

// ── Selectors ─────────────────────────────────────────────────────────────

export const selectUsuario     = (state) => state.auth.usuario;
export const selectToken       = (state) => state.auth.token;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthErro    = (state) => state.auth.erro;
export const selectIsLoggedIn  = (state) => Boolean(state.auth.token);
export const selectIsProprietario = (state) =>
  state.auth.usuario?.tipoUsuario === "PROPRIETARIO";

export default authSlice.reducer;
