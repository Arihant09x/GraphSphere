import api from "@/api/axios";
export interface User {
  id: string;
  name: string;
  email: string;
}
export interface AuthResult {
  accessToken: string;
  user: User;
}
export const authApi = {
  login: async (body: { email: string; password: string }) =>
    (await api.post<{ data: AuthResult }>("/auth/login", body)).data.data,
  register: async (body: { name: string; email: string; password: string }) =>
    (await api.post<{ data: AuthResult }>("/auth/register", body)).data.data,
  me: async () =>
    (
      await api.get<{
        data: { user: User; developer: Record<string, unknown> | null };
      }>("/auth/me")
    ).data.data,
};
