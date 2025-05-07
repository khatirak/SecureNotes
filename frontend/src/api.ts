import axios from "axios";
import { Note } from "./types";

const API_URL = "http://localhost:8000";
console.log(`API configured to connect to: ${API_URL}`);


// Create axios instance and add base URL
const api = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username: string, password: string) => {
  const response = await api.post("/auth/login", { username, password });
  return response.data;
};

export const getNotes = async (): Promise<Note[]> => {
  const response = await api.get("/notes");
  return response.data;
};

export const addNote = async (text: string): Promise<Note> => {
  const response = await api.post("/notes", { text });
  return response.data;
};

