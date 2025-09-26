export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}