import api from "../api/axios";

const dashboardService = {
  getDashboard: async () => {
    const { data } = await api.get("/proprietario/dashboard");
    return data;
  },
};

export default dashboardService;
