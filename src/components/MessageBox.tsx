import { Flex, Card } from "antd";
import Markdown from "react-markdown";

interface MessageBoxProps {
  message: string;
  sender: "user" | "model";
  timestamp?: string;
};

const MessageBox = ({ message, sender, timestamp }: MessageBoxProps) => {
  return (
    <Flex justify={sender === "user" ? "end" : "start"} style={{ marginBottom: 8 }}>
      <Card
        style={{ borderRadius: 8, maxWidth: 320, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}
        styles={{
          body: {
            padding: "8px 16px",
            background: sender === "user" ? "#382ee5" : "#d7dfff",
            color: sender === "user" ? "#fff" : "#000",
            borderRadius: 8,
          }
        }}
      >
        <div style={{ wordBreak: "break-word", margin: 0 }}><Markdown>{message}</Markdown></div>
        {timestamp && (
          <span style={{ fontSize: 10, color: sender === "user" ? "#e0e7ff" : "#64748b", float: "right" }}>
            {(() => {
              const d = new Date(timestamp);
              const day = d.getDate().toString().padStart(2, '0');
              const month = (d.getMonth() + 1).toString().padStart(2, '0');
              const year = d.getFullYear().toString().slice(-2);
              const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              return `${day}/${month}/${year} ${time}`;
            })()}
          </span>
        )}
      </Card>
    </Flex>
  );
};

export default MessageBox;
