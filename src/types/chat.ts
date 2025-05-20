export interface Message {
  role: "user" | "model";
  content: string;
  timestamp: string; // ISO string for frontend
}

export interface Chat {
  messages: Message[];
}
