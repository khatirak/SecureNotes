export interface Note {
  id: string;
  text: string;
  timestamp: number;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}
