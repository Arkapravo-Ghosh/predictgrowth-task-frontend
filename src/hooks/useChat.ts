import { useState } from "react";
import { type Message } from "../types/chat";
import { sendChatMessage, getChatHistory } from "../api/chat";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const fetchHistory = async (token?: string) => {
    setLoading(true);
    try {
      const res = await getChatHistory(token);
      setMessages(res.history);
    } catch {
      setMessages([]);
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  };

  const handleSend = async (msg: string, token?: string) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: msg, timestamp: new Date().toISOString() },
    ]);
    setLoading(true);
    try {
      const res = await sendChatMessage(msg, token);
      setMessages((prev) => [
        ...prev,
        { role: "model", content: res.message, timestamp: new Date().toISOString() },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "model", content: "Sorry, something went wrong. Please try again.", timestamp: new Date().toISOString() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, handleSend, setMessages, fetchHistory, initialized };
}
