import { User } from "./user";

export interface EmailData {
  email: string;
};

export interface ResetPasswordData {
  token: string;
  password: string;
};

export interface LoginData {
  email: string;
  password: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type LoginResponse = {
  user: User;
} & AuthTokens;
