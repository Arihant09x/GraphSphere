export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResult {
  accessToken: string;
  user: User;
}
