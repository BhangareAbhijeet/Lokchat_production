import apiClient from "../../../services/api/apiclient";

export const authService = {
  async register({ name, email, password }) {
    const response = await apiClient.post("/auth/register", {
      name,
      email,
      password,
    });

    return response.data;
  },

  async login({ email, password }) {
    const response = await apiClient.post("/auth/login", {
      email,
      password,
    });

    const token = response.data?.data?.token;

    if (!token) {
      throw new Error("Login response did not contain an authentication token.");
    }

    localStorage.setItem("lokchat_token", token);

    return response.data.data;
  },

  async getMyProfile() {
    const response = await apiClient.get("/users/me");

    return response.data.data.user;
  },

  isAuthenticated() {
    return Boolean(localStorage.getItem("lokchat_token"));
  },

  logout() {
    localStorage.removeItem("lokchat_token");
  },
};