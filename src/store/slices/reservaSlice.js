import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reservaService from "../../services/reservaService";

// ── Thunks ────────────────────────────────────────────────────────────────

export const criarReservaThunk = createAsyncThunk(
  "reservas/criar",
  async (payload, { rejectWithValue }) => {
    try {
      return await reservaService.criar(payload);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.erro || "Erro ao criar reserva"
      );
    }
  }
);

export const minhasReservasThunk = createAsyncThunk(
  "reservas/minhas",
  async (_, { rejectWithValue }) => {
    try {
      return await reservaService.minhasReservas();
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.erro || "Erro ao carregar reservas"
      );
    }
  }
);

export const confirmarPagamentoThunk = createAsyncThunk(
  "reservas/confirmar",
  async (reservaId, { rejectWithValue }) => {
    try {
      return await reservaService.confirmarPagamento(reservaId);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.erro || "Erro ao confirmar pagamento"
      );
    }
  }
);

export const cancelarReservaThunk = createAsyncThunk(
  "reservas/cancelar",
  async (reservaId, { rejectWithValue }) => {
    try {
      return await reservaService.cancelar(reservaId);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.erro || "Erro ao cancelar reserva"
      );
    }
  }
);

export const reservasProprietarioThunk = createAsyncThunk(
  "reservas/proprietario",
  async (_, { rejectWithValue }) => {
    try {
      return await reservaService.reservasProprietario();
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.erro || "Erro ao carregar reservas"
      );
    }
  }
);

// ── Slice ─────────────────────────────────────────────────────────────────

const reservaSlice = createSlice({
  name: "reservas",
  initialState: {
    lista: [],
    reservasProprietario: [],
    loading: false,
    erro: null,
    sucesso: null,
  },
  reducers: {
    limparErro:   (state) => { state.erro = null; },
    limparSucesso: (state) => { state.sucesso = null; },
  },
  extraReducers: (builder) => {
    builder
      // Criar
      .addCase(criarReservaThunk.pending, (state) => {
        state.loading = true;
        state.erro = null;
      })
      .addCase(criarReservaThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.lista.unshift(action.payload);
        state.sucesso = "Reserva criada com sucesso!";
      })
      .addCase(criarReservaThunk.rejected, (state, action) => {
        state.loading = false;
        state.erro = action.payload;
      })

      // Minhas reservas
      .addCase(minhasReservasThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(minhasReservasThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload;
      })
      .addCase(minhasReservasThunk.rejected, (state, action) => {
        state.loading = false;
        state.erro = action.payload;
      })

      // Confirmar pagamento
      .addCase(confirmarPagamentoThunk.fulfilled, (state, action) => {
        const idx = state.lista.findIndex((r) => r.id === action.payload.id);
        if (idx !== -1) state.lista[idx] = action.payload;
        state.sucesso = "Pagamento confirmado!";
      })

      // Cancelar
      .addCase(cancelarReservaThunk.fulfilled, (state, action) => {
        const idx = state.lista.findIndex((r) => r.id === action.payload.id);
        if (idx !== -1) state.lista[idx] = action.payload;
        state.sucesso = "Reserva cancelada.";
      })

      // Reservas do proprietário
      .addCase(reservasProprietarioThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(reservasProprietarioThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.reservasProprietario = action.payload;
      })
      .addCase(reservasProprietarioThunk.rejected, (state, action) => {
        state.loading = false;
        state.erro = action.payload;
      });
  },
});

export const { limparErro, limparSucesso } = reservaSlice.actions;

// ── Selectors ─────────────────────────────────────────────────────────────

export const selectReservas              = (state) => state.reservas.lista;
export const selectReservasProprietario  = (state) => state.reservas.reservasProprietario;
export const selectReservasLoading       = (state) => state.reservas.loading;
export const selectReservasErro          = (state) => state.reservas.erro;
export const selectReservasSucesso       = (state) => state.reservas.sucesso;

export default reservaSlice.reducer;
