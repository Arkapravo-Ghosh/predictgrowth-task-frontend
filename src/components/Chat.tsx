import { useRef, useEffect } from "react";
import MessageBox from "./MessageBox";
import MessageInput from "./MessageInput";

interface ChatProps {
  messages: Array<{ sender: "user" | "model"; message: string, timestamp?: string }>;
  onSend: (msg: string) => void;
  loading: boolean;
};

const Chat: React.FC<ChatProps> = ({ messages, onSend, loading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "70vh", padding: 24 }}>
      <div style={{ flex: 1, overflowY: "auto", marginBottom: 16 }}>
        {messages.length === 0 ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", marginTop: 40, color: "#a0aec0" }}>
            <span>Start the conversation...</span>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <MessageBox key={idx} message={msg.message} sender={msg.sender} timestamp={msg.timestamp} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput onSend={onSend} loading={loading} />
    </div>
  );
};

export default Chat;
