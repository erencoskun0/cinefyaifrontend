import { apiClient } from "./apiClient";
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  RefreshTokenRequest,
  UserInfo,
} from "@/types/auth";

export class AuthService {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/auth/login", data);

   
    if (response.token) {
      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("refresh_token", response.refreshToken);
      localStorage.setItem("user_info", JSON.stringify(response.user));
    }

    return response;
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/auth/register", data);


    if (response.token) {
      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("refresh_token", response.refreshToken);
      localStorage.setItem("user_info", JSON.stringify(response.user));
    }

    return response;
  }

  async getCurrentUser(): Promise<UserInfo> {
    return await apiClient.get<UserInfo>("/auth/me");
  }

  async refreshToken(): Promise<AuthResponse> {
    const token = localStorage.getItem("auth_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (!token || !refreshToken) {
      throw new Error("Token bulunamadı");
    }

    const data: RefreshTokenRequest = {
      token,
      refreshToken,
    };

    const response = await apiClient.post<AuthResponse>(
      "/auth/refresh-token",
      data
    );

 
    localStorage.setItem("auth_token", response.token);
    localStorage.setItem("refresh_token", response.refreshToken);
    localStorage.setItem("user_info", JSON.stringify(response.user));

    return response;
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.warn("Logout API call failed, but clearing local storage anyway");
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_info");
    }
  }

  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;

    const token = localStorage.getItem("auth_token");
    return !!token;
  }

  getUser(): UserInfo | null {
    if (typeof window === "undefined") return null;

    const userInfo = localStorage.getItem("user_info");
    if (!userInfo) return null;

    try {
      return JSON.parse(userInfo);
    } catch {
      return null;
    }
  }

  getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
  }

  hasRole(role: string): boolean {
    const user = this.getUser();
    return user?.roles?.includes(role) || false;
  }

 
  isAdmin(): boolean {
    return this.hasRole("Admin");
  }


  isCinemaOwner(): boolean {
    return this.hasRole("CinemaOwner");
  }


  isUser(): boolean {
    return this.hasRole("User");
  }
}

export const authService = new AuthService();
