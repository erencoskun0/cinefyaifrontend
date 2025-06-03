export enum UserRole {
  User = "8D226B06-6C22-4F2A-C3FF-08DDA165AA38",
  CinemaOwner = "201541AF-EB6D-4FEF-C3FE-08DDA165AA38",
  Admin = "FCA77B38-6B1E-4D0B-C3FD-08DDA165AA38",
}

export interface UserInfo {
  id: string;
  email: string;
  fullName: string;
  roles: string[];
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  expiresAt: string;
  user: UserInfo;
}

export interface RefreshTokenRequest {
  token: string;
  refreshToken: string;
}

export interface AuthContextType {
  user: UserInfo | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}
