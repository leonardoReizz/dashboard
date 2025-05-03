import { httpClient } from "./client";
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  ResetPasswordRequest,
} from "./types/auth";

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await httpClient.post<LoginResponse>("/auth/login", data);
    return response.data;
  },
  refreshToken: async (): Promise<RefreshTokenResponse> => {
    const response = await httpClient.post<RefreshTokenResponse>(
      "/auth/refresh-token",
    );
    return response.data;
  },
  resetPassword: async (data: ResetPasswordRequest): Promise<void> => {
    const response = await httpClient.post<void>("/auth/reset-password", data);
    return response.data;
  },
};
