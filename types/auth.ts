import { User } from "./user";

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
