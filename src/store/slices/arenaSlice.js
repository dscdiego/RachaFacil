import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import arenaService from "../../services/arenaService";

// ── Thunks ────────────────────────────────────────────────────────────────

export const listarArenasThunk = createAsyncThunk(
  "arenas/listar",
  async (busca = "", { rejectWithValue }) => {
    try {
      return await arenaService.listar(busca);
    } catch (err) {
      return rejectWithValue(err.response?.data?.erro || "Erro ao buscar arenas");
    }
  }
);

export const buscarArenaPorIdThunk = createAsyncThunk(
  "arenas/buscarPorId",
  async (id, { rejectWithValue }) => {
    try {
      return await arenaService.buscarPorId(id);
    } catch (err) {
      return rejectWithValue(err.response?.data?.erro || "Arena não encontrada");
    }
  }
);

export const minhasArenasThunk = createAsyncThunk(
  "arenas/minhas",
  async (_, { rejectWithValue }) => {
    try {
      return await arenaService.minhasArenas();
    } catch (err) {
      return rejectWithValue(err.response?.data?.erro || "Erro ao carregar arenas");
    }
  }
);

export const cadastrarArenaThunk = createAsyncThunk(
  "arenas/cadastrar",
  async (arenaData, { rejectWithValue }) => {
    try {
      return await arenaService.cadastrar(arenaData);
    } catch (err) {
      return rejectWithValue(err.response?.data?.erro || "Erro ao cadastrar arena");
    }
  }
);

export const editarArenaThunk = createAsyncThunk(
  "arenas/editar",
  async ({ id, ...arenaData }, { rejectWithValue }) => {
    try {
      return await arenaService.editar(id, arenaData);
    } catch (err) {
      return rejectWithValue(err.response?.data?.erro || "Erro ao editar arena");
    }
  }
);

export const excluirArenaThunk = createAsyncThunk(
  "arenas/excluir",
  async (id, { rejectWithValue }) => {
    try {
      await arenaService.excluir(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.erro || "Erro ao excluir arena");
    }
  }
);

export const adicionarHorarioThunk = createAsyncThunk(
  "arenas/adicionarHorario",
  async ({ arenaId, ...horarioData }, { rejectWithValue }) => {
    try {
      const horario = await arenaService.adicionarHorario(arenaId, horarioData);
      return { arenaId, horario };
    } catch (err) {
      return rejectWithValue(err.response?.data?.erro || "Erro ao adicionar horário");
    }
  }
);

// ── Slice ─────────────────────────────────────────────────────────────────

const arenaSlice = createSlice({
  name: "arenas",
  initialState: {
    lista: [],
    minhasArenas: [],
    arenaSelecionada: null,
    loading: false,
    erro: null,
  },
  reducers: {
    limparArenaSelecionada: (state) => {
      state.arenaSelecionada = null;
    },
    limparErro: (state) => {
      state.erro = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Listar arenas públicas
      .addCase(listarArenasThunk.pending, (state) => {
        state.loading = true;
        state.erro = null;
      })
      .addCase(listarArenasThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload;
      })
      .addCase(listarArenasThunk.rejected, (state, action) => {
        state.loading = false;
        state.erro = action.payload;
      })

      // Buscar por ID
      .addCase(buscarArenaPorIdThunk.fulfilled, (state, action) => {
        state.arenaSelecionada = action.payload;
      })

      // Minhas arenas
      .addCase(minhasArenasThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(minhasArenasThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.minhasArenas = action.payload;
      })
      .addCase(minhasArenasThunk.rejected, (state, action) => {
        state.loading = false;
        state.erro = action.payload;
      })

      // Cadastrar
      .addCase(cadastrarArenaThunk.fulfilled, (state, action) => {
        state.minhasArenas.push(action.payload);
      })

      // Editar
      .addCase(editarArenaThunk.fulfilled, (state, action) => {
        const idx = state.minhasArenas.findIndex((a) => a.id === action.payload.id);
        if (idx !== -1) state.minhasArenas[idx] = action.payload;
      })

      // Excluir
      .addCase(excluirArenaThunk.fulfilled, (state, action) => {
        state.minhasArenas = state.minhasArenas.filter((a) => a.id !== action.payload);
      })

      // Adicionar horário
      .addCase(adicionarHorarioThunk.fulfilled, (state, action) => {
        const arena = state.minhasArenas.find((a) => a.id === action.payload.arenaId);
        if (arena) {
          if (!arena.horarios) arena.horarios = [];
          arena.horarios.push(action.payload.horario);
        }
      });
  },
});

export const { limparArenaSelecionada, limparErro } = arenaSlice.actions;

// ── Selectors ─────────────────────────────────────────────────────────────

export const selectArenas          = (state) => state.arenas.lista;
export const selectMinhasArenas    = (state) => state.arenas.minhasArenas;
export const selectArenaSelecionada = (state) => state.arenas.arenaSelecionada;
export const selectArenasLoading   = (state) => state.arenas.loading;
export const selectArenasErro      = (state) => state.arenas.erro;

export default arenaSlice.reducer;
