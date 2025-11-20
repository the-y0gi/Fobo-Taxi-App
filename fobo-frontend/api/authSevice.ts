// src/api/authService.ts
import api from "./axiosInstance";
import { AuthResponse,
  LoginCredentials,
  UserRegistrationData } from "../types/auth";

const authService = {
 login: (credentials: LoginCredentials) =>
    api.post<AuthResponse>("/auth/login", credentials),

  register: (data: UserRegistrationData) =>
    api.post<AuthResponse>("/auth/register", data),

  getProfile: () =>
    api.get<AuthResponse>("/auth/me"),
};

export default authService;
