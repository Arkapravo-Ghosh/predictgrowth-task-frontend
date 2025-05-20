import axiosInstance from "../utils/axiosUtils";
import { type Message } from "../types/chat";

export interface ChatResponse {
  message: string;
  history: Message[];
}

export const sendChatMessage = async (message: string, token?: string) => {
  const res = await axiosInstance.post<ChatResponse>(
    "/chat",
    { message },
    token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
  );
  return res.data;
};

export const getChatHistory = async (token?: string) => {
  const res = await axiosInstance.get<ChatResponse>(
    "/chat",
    token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
  );
  return res.data;
};
