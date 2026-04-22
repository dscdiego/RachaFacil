import { configureStore } from "@reduxjs/toolkit";
import authReducer     from "./slices/authSlice";
import arenaReducer    from "./slices/arenaSlice";
import reservaReducer  from "./slices/reservaSlice";
import dashboardReducer from "./slices/dashboardSlice";

const store = configureStore({
  reducer: {
    auth:      authReducer,
    arenas:    arenaReducer,
    reservas:  reservaReducer,
    dashboard: dashboardReducer,
  },
});

export default store;
