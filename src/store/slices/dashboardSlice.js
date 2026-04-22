import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dashboardService from "../../services/dashboardService";

export const getDashboardThunk = createAsyncThunk(
  "dashboard/get",
  async (_, { rejectWithValue }) => {
    try {
      return await dashboardService.getDashboard();
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.erro || "Erro ao carregar dashboard"
      );
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    dados: null,
    loading: false,
    erro: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardThunk.pending, (state) => {
        state.loading = true;
        state.erro = null;
      })
      .addCase(getDashboardThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.dados = action.payload;
      })
      .addCase(getDashboardThunk.rejected, (state, action) => {
        state.loading = false;
        state.erro = action.payload;
      });
  },
});

export const selectDashboard        = (state) => state.dashboard.dados;
export const selectDashboardLoading = (state) => state.dashboard.loading;
export const selectDashboardErro    = (state) => state.dashboard.erro;

export default dashboardSlice.reducer;
