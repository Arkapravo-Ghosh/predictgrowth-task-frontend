import React from "react";
import { Input, Button } from "antd";

interface MessageInputProps {
  onSend: (msg: string) => void;
  loading: boolean;
};

const MessageInput: React.FC<MessageInputProps> = ({ onSend, loading }) => {
  const [input, setInput] = React.useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput("");
    };
  };

  return (
    <form onSubmit={handleSend} style={{ display: "flex", gap: 8, width: "100%" }}>
      <Input
        style={{ flex: 1 }}
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type your message..."
        disabled={loading}
        onPressEnter={handleSend}
        autoFocus
      />
      <Button
        type="primary"
        htmlType="submit"
        loading={loading}
        disabled={loading || !input.trim()}
        style={{ whiteSpace: "nowrap" }}
        size="middle"
      >
        {loading ? "" : "Send"}
      </Button>
    </form>
  );
};

export default MessageInput;
